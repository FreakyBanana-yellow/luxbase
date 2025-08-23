// netlify/functions/stripe-webhook.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

const SUPABASE = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE, // Server-side only
  { auth: { persistSession: false } }
);

function rawBodyFromEvent(event) {
  if (event.isBase64Encoded) return Buffer.from(event.body || "", "base64");
  return Buffer.from(event.body || "", "utf8");
}

function addDays(isoDate, days) {
  const d = new Date(isoDate);
  d.setUTCDate(d.getUTCDate() + Number(days || 0));
  return d.toISOString();
}

async function findCreatorByStripeAccount(stripeAccountId) {
  // Mapping: creator_config(stripe_account_id) -> creator_id, vip_dauer
  const { data, error } = await SUPABASE
    .from("creator_config")
    .select("creator_id, vip_dauer")
    .eq("stripe_account_id", stripeAccountId)
    .maybeSingle();
  if (error) throw error;
  return data; // { creator_id, vip_dauer }
}

async function upsertVipRow({ creator_id, price, vip_dauer, tg_user_id, stripe_customer_id, eventType }) {
  const now = new Date().toISOString();
  const vip_bis = addDays(now, vip_dauer || 30);

  // upsert-Key: (creator_id, stripe_customer_id) – lege dafür am besten
  // in Supabase einen UNIQUE Index an (siehe Abschnitt „Schema“).
  const payload = {
    creator_id,
    letzter_kontakt: now,
    vip_bis,
    status: "active",
    price_eur: price != null ? Number(price) : null,
    tg_user_id: tg_user_id || null,
    stripe_customer_id: stripe_customer_id || null,
    source: "stripe_webhook",
    last_event: eventType,
  };

  const { error } = await SUPABASE
    .from("vip_users")
    .upsert(payload, { onConflict: "creator_id,stripe_customer_id" });
  if (error) throw error;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
    const raw = rawBodyFromEvent(event);

    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
    } catch (err) {
      return { statusCode: 400, body: `Webhook signature verification failed: ${err.message}` };
    }

    // Für Connect-Events liefert Stripe die Account-ID:
    // - Entweder im Event-Objekt: stripeEvent.account
    // - oder im Header 'Stripe-Account'
    const stripeAccountId =
      stripeEvent.account ||
      event.headers["stripe-account"] ||
      event.headers["Stripe-Account"];

    if (!stripeAccountId) {
      // Ohne Zuordnung kein Creator → ignoriere
      return { statusCode: 200, body: "No stripe account on event; ignored." };
    }

    // Creator + VIP-Dauer ermitteln
    const creator = await findCreatorByStripeAccount(stripeAccountId);
    if (!creator?.creator_id) {
      return { statusCode: 200, body: "No creator mapping; ignored." };
    }

    const type = stripeEvent.type;
    // Relevante Events – nimm mind. checkout.session.completed + invoice.paid
    // (je nach Flow ggf. payment_intent.succeeded)
    if (type === "checkout.session.completed") {
      const session = stripeEvent.data.object;

      // Metadaten sauber befüllen, wenn du die Session erstellst:
      // - session.metadata.creator_id
      // - session.metadata.tg_user_id (optional)
      // - session.metadata.price_eur (optional)
      const tg_user_id = session?.metadata?.tg_user_id || null;
      const price = session?.metadata?.price_eur
        ? Number(session.metadata.price_eur)
        : (session?.amount_total ? session.amount_total / 100 : null);

      await upsertVipRow({
        creator_id: creator.creator_id,
        price,
        vip_dauer: creator.vip_dauer || 30,
        tg_user_id,
        stripe_customer_id: session.customer || null,
        eventType: type,
      });

    } else if (type === "invoice.paid") {
      // gut für Verlängerungen/Subscriptions
      const invoice = stripeEvent.data.object;
      const price = invoice?.amount_paid != null ? invoice.amount_paid / 100 : null;

      await upsertVipRow({
        creator_id: creator.creator_id,
        price,
        vip_dauer: creator.vip_dauer || 30,
        tg_user_id: null, // Falls im Metadata: invoice.metadata.tg_user_id
        stripe_customer_id: invoice.customer || null,
        eventType: type,
      });

    } else if (type === "payment_intent.succeeded") {
      // optionaler Fallback
      const pi = stripeEvent.data.object;
      const price = pi?.amount_received != null ? pi.amount_received / 100 : null;

      await upsertVipRow({
        creator_id: creator.creator_id,
        price,
        vip_dauer: creator.vip_dauer || 30,
        tg_user_id: pi?.metadata?.tg_user_id || null,
        stripe_customer_id: pi.customer || null,
        eventType: type,
      });
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("stripe-webhook error:", err);
    return { statusCode: 500, body: "server_error" };
  }
};
