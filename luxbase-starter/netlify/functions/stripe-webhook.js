// netlify/functions/stripe-webhook.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "");
const { createClient } = require("@supabase/supabase-js");

// ---- Supabase client (Service Role, server-side only)
const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL; // falls nur PUBLIC gesetzt ist
const SUPABASE = createClient(
  SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
  { auth: { persistSession: false } }
);

// ---- Helpers
function rawBodyFromEvent(event) {
  if (event.isBase64Encoded) return Buffer.from(event.body || "", "base64");
  return Buffer.from(event.body || "", "utf8");
}
function addDays(isoDate, days) {
  const d = new Date(isoDate);
  d.setUTCDate(d.getUTCDate() + Number(days || 0));
  return d.toISOString();
}
function maxISO(a, b) {
  const da = a ? new Date(a).getTime() : 0;
  const db = b ? new Date(b).getTime() : 0;
  return (da >= db ? a : b) || b || a;
}

async function findCreatorByStripeAccount(stripeAccountId) {
  // Mapping: creator_config(stripe_account_id) -> creator_id, vip_dauer
  const { data, error } = await SUPABASE
    .from("creator_config")
    .select("creator_id, vip_dauer")
    .eq("stripe_account_id", stripeAccountId)
    .maybeSingle();
  if (error) throw error;
  return data || null; // { creator_id, vip_dauer }
}

async function getVipRow({ creator_id, stripe_customer_id }) {
  const { data, error } = await SUPABASE
    .from("vip_users")
    .select("creator_id, stripe_customer_id, tg_user_id, vip_bis, status, stripe_subscription_id")
    .eq("creator_id", creator_id)
    .eq("stripe_customer_id", stripe_customer_id)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

/**
 * Upsert via Einmalkauf:
 * Verlängert "ab dem späteren Datum": base = max(now, existing.vip_bis)
 */
async function upsertFromOneOff({
  creator_id,
  vip_dauer,
  stripe_customer_id,
  tg_user_id,
  price_eur,
  eventType,
}) {
  const nowISO = new Date().toISOString();
  const existing = await getVipRow({ creator_id, stripe_customer_id });

  const base = maxISO(existing?.vip_bis, nowISO);
  const vip_bis = addDays(base, vip_dauer || 30);

  const payload = {
    creator_id,
    letzter_kontakt: nowISO,
    vip_bis,
    status: "active",
    price_eur: price_eur != null ? Number(price_eur) : null,
    tg_user_id: tg_user_id || existing?.tg_user_id || null,
    stripe_customer_id: stripe_customer_id || existing?.stripe_customer_id || null,
    renewal_mode: "one_off",
    source: "stripe_webhook",
    last_event: eventType,
  };

  const { error } = await SUPABASE
    .from("vip_users")
    .upsert(payload, { onConflict: "creator_id,stripe_customer_id" });
  if (error) throw error;
}

/**
 * Upsert via Subscription-Invoice:
 * Setzt vip_bis exakt auf das Periodenende der Invoice.
 */
async function upsertFromSubscriptionInvoice({
  creator_id,
  stripe_customer_id,
  tg_user_id,
  stripe_subscription_id,
  period_end_unix,
  amount_paid_eur,
  eventType,
}) {
  const nowISO = new Date().toISOString();
  const vip_bis = period_end_unix
    ? new Date(period_end_unix * 1000).toISOString()
    : null;

  const existing = await getVipRow({ creator_id, stripe_customer_id });

  const payload = {
    creator_id,
    letzter_kontakt: nowISO,
    status: "active",
    vip_bis: vip_bis || existing?.vip_bis || nowISO,
    price_eur: amount_paid_eur != null ? Number(amount_paid_eur) : existing?.price_eur ?? null,
    tg_user_id: tg_user_id || existing?.tg_user_id || null,
    stripe_customer_id,
    stripe_subscription_id: stripe_subscription_id || existing?.stripe_subscription_id || null,
    renewal_mode: "subscription",
    source: "stripe_webhook",
    last_event: eventType,
  };

  const { error } = await SUPABASE
    .from("vip_users")
    .upsert(payload, { onConflict: "creator_id,stripe_customer_id" });
  if (error) throw error;
}

async function setStatusBySubOrCustomer({
  creator_id,
  stripe_subscription_id,
  stripe_customer_id,
  status,
  vip_bis_unix, // optional (für canceled zum Periodenende)
}) {
  const updates = { status, letzter_kontakt: new Date().toISOString() };
  if (vip_bis_unix) updates.vip_bis = new Date(vip_bis_unix * 1000).toISOString();

  let q = SUPABASE.from("vip_users").update(updates).eq("creator_id", creator_id);

  if (stripe_subscription_id) q = q.eq("stripe_subscription_id", stripe_subscription_id);
  else q = q.eq("stripe_customer_id", stripe_customer_id);

  const { error } = await q;
  if (error) throw error;
}

// ---- Webhook handler
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const sig = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
    const raw = rawBodyFromEvent(event);

    // Zwei mögliche Secrets: Plattform & Connected-Accounts
    const SEC_PLATFORM = process.env.STRIPE_WEBHOOK_SECRET;
    const SEC_CONNECT  = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;

    let stripeEvent = null;
    try {
      if (!SEC_PLATFORM) throw new Error("no platform secret set");
      stripeEvent = stripe.webhooks.constructEvent(raw, sig, SEC_PLATFORM);
    } catch (e1) {
      if (!SEC_CONNECT) {
        return { statusCode: 400, body: `Webhook signature failed (platform): ${e1.message}` };
      }
      try {
        stripeEvent = stripe.webhooks.constructEvent(raw, sig, SEC_CONNECT);
      } catch (e2) {
        return { statusCode: 400, body: `Webhook signature failed (connect): ${e2.message}` };
      }
    }

    // Für Connect-Events:
    const stripeAccountId =
      stripeEvent.account ||
      event.headers["stripe-account"] ||
      event.headers["Stripe-Account"];

    if (!stripeAccountId) {
      // Ohne Mapping wissen wir nicht, welcher Creator gemeint ist.
      return { statusCode: 200, body: "No stripe account on event; ignored." };
    }

    const creator = await findCreatorByStripeAccount(stripeAccountId);
    if (!creator?.creator_id) {
      return { statusCode: 200, body: "No creator mapping; ignored." };
    }
    const creator_id = creator.creator_id;
    const vip_dauer  = Number(creator.vip_dauer || 30);

    const type = stripeEvent.type;

    // === Events ===
    if (type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const mode = session?.mode; // 'payment' | 'subscription'
      const md = session?.metadata || {};
      const tg_user_id = md.tg_user_id || null;
      const stripe_customer_id = session.customer || null;
      const price_eur =
        md.price_eur ? Number(md.price_eur) :
        (session?.amount_total != null ? session.amount_total / 100 : null);

      if (!stripe_customer_id) {
        return { statusCode: 200, body: "No customer on session; ignored." };
      }

      if (mode === "payment") {
        // Einmalkauf → Verlängerung ab dem späteren Datum
        await upsertFromOneOff({
          creator_id,
          vip_dauer,
          stripe_customer_id,
          tg_user_id,
          price_eur,
          eventType: type,
        });
      } else if (mode === "subscription") {
        // Subscription: eigentliche Laufzeit kommt mit invoice.paid
        // Wir legen/aktualisieren schon mal den Datensatz (ohne vip_bis)
        const existing = await getVipRow({ creator_id, stripe_customer_id });
        const payload = {
          creator_id,
          letzter_kontakt: new Date().toISOString(),
          status: "active",
          tg_user_id: tg_user_id || existing?.tg_user_id || null,
          stripe_customer_id,
          stripe_subscription_id: session.subscription || existing?.stripe_subscription_id || null,
          renewal_mode: "subscription",
          source: "stripe_webhook",
          last_event: type,
          vip_bis: existing?.vip_bis || null, // wird bei invoice.paid gesetzt
        };
        const { error } = await SUPABASE
          .from("vip_users")
          .upsert(payload, { onConflict: "creator_id,stripe_customer_id" });
        if (error) throw error;
      }

    } else if (type === "invoice.paid") {
      // Abo-Verlängerung: nutze Invoice-Periode
      const invoice = stripeEvent.data.object;
      const stripe_customer_id = invoice.customer || null;
      if (!stripe_customer_id) return { statusCode: 200, body: "No customer on invoice; ignored." };

      const subId = invoice.subscription || null;
      const line0 = invoice.lines?.data?.[0];
      const periodEnd = line0?.period?.end || null;

      // Optionales Mapping aus Metadata
      const md = invoice?.metadata || {};
      const tg_user_id = md.tg_user_id || null;

      const amount_paid_eur =
        invoice?.amount_paid != null ? invoice.amount_paid / 100 : null;

      if (subId && periodEnd) {
        await upsertFromSubscriptionInvoice({
          creator_id,
          stripe_customer_id,
          tg_user_id,
          stripe_subscription_id: subId,
          period_end_unix: periodEnd,
          amount_paid_eur,
          eventType: type,
        });
      } else {
        // Fallback (selten): wie Einmalkauf verlängern
        await upsertFromOneOff({
          creator_id,
          vip_dauer,
          stripe_customer_id,
          tg_user_id,
          price_eur: amount_paid_eur,
          eventType: type,
        });
      }

    } else if (type === "invoice.payment_failed") {
      const invoice = stripeEvent.data.object;
      const stripe_customer_id = invoice.customer || null;
      const subId = invoice.subscription || null;

      await setStatusBySubOrCustomer({
        creator_id,
        stripe_subscription_id: subId,
        stripe_customer_id,
        status: "grace",
      });

    } else if (type === "customer.subscription.updated" || type === "customer.subscription.deleted") {
      const sub = stripeEvent.data.object;
      const subId = sub.id;
      const target =
        sub.status === "canceled" || sub.cancel_at_period_end ? "canceled" : "active";

      await setStatusBySubOrCustomer({
        creator_id,
        stripe_subscription_id: subId,
        status: target,
        vip_bis_unix: sub.current_period_end || null,
      });

    } else if (type === "payment_intent.succeeded") {
      // Optional: Fallback für Einzelzahlungen außerhalb von Checkout
      const pi = stripeEvent.data.object;
      const stripe_customer_id = pi.customer || null;
      if (stripe_customer_id) {
        await upsertFromOneOff({
          creator_id,
          vip_dauer,
          stripe_customer_id,
          tg_user_id: pi?.metadata?.tg_user_id || null,
          price_eur: pi?.amount_received != null ? pi.amount_received / 100 : null,
          eventType: type,
        });
      }
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("stripe-webhook error:", err);
    return { statusCode: 500, body: "server_error" };
  }
};
