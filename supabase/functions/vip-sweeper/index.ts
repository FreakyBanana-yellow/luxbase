// supabase/functions/vip-sweeper/index.ts
// Deno Edge Function – prüft VIP-Laufzeiten, warnt & kickt abgelaufene aus der TG-Gruppe.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type VipUser = {
  creator_id: string;
  telegram_id: string;
  chat_id: string | null;
  status: string | null;
  vip_bis: string | null; // YYYY-MM-DD
};

type CreatorCfg = {
  creator_id: string;
  group_chat_id: string | null;
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; // set as secret
const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;                      // set as secret

const TG = (method: string, body: unknown) =>
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const sb = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function addDaysISO(days: number) {
  return new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
}

async function warnExpiring(daysBefore = 5) {
  // Warnen: heute .. heute+5, status=aktiv, warned_at IS NULL
  const from = todayISO();
  const to = addDaysISO(daysBefore);

  const { data: users, error } = await sb
    .from("vip_users")
    .select("creator_id, telegram_id, chat_id, vip_bis, status, warned_at")
    .gte("vip_bis", from)
    .lte("vip_bis", to)
    .eq("status", "aktiv")
    .is("warned_at", null);

  if (error) {
    console.error("[sweeper] warnExpiring select error:", error.message);
    return;
  }
  if (!users?.length) return;

  for (const u of users as any[]) {
    const chat = Number(u.chat_id || u.telegram_id);
    try {
      await TG("sendMessage", {
        chat_id: chat,
        text: `⏰ Dein VIP läuft am ${u.vip_bis} ab. Verlängere rechtzeitig mit /start → „Jetzt bezahlen“.`,
      });
      await sb.from("vip_users")
        .update({ warned_at: new Date().toISOString() })
        .eq("creator_id", u.creator_id)
        .eq("telegram_id", u.telegram_id);
    } catch (e) {
      console.warn("[sweeper] warn send failed:", e?.message);
    }
  }
}

async function kickExpired() {
  const today = todayISO();

  // Abgelaufene, noch aktiv
  const { data: users, error } = await sb
    .from("vip_users")
    .select("creator_id, telegram_id, chat_id, vip_bis, status")
    .lt("vip_bis", today)
    .eq("status", "aktiv");

  if (error) {
    console.error("[sweeper] kickExpired select error:", error.message);
    return { kicked: 0 };
  }
  if (!users?.length) return { kicked: 0 };

  // alle Gruppen holen
  const creatorIds = Array.from(new Set(users.map(u => u.creator_id)));
  const { data: cfgs, error: cfgErr } = await sb
    .from("creator_config")
    .select("creator_id, group_chat_id")
    .in("creator_id", creatorIds);

  if (cfgErr) {
    console.error("[sweeper] get groups error:", cfgErr.message);
    return { kicked: 0 };
  }
  const map = new Map<string, string | null>();
  (cfgs || []).forEach((c: CreatorCfg) => map.set(c.creator_id, c.group_chat_id));

  let kicked = 0;

  for (const u of users as VipUser[]) {
    const group = map.get(u.creator_id);
    if (!group) {
      // keine Gruppe verknüpft – nur Status umsetzen
      await sb.from("vip_users")
        .update({ status: "abgelaufen" })
        .eq("creator_id", u.creator_id)
        .eq("telegram_id", u.telegram_id);
      continue;
    }

    try {
      // „Soft‑Kick“: ban + unban
      await TG("banChatMember", { chat_id: group, user_id: Number(u.telegram_id) });
      await TG("unbanChatMember", { chat_id: group, user_id: Number(u.telegram_id), only_if_banned: true });

      await sb.from("vip_users")
        .update({ status: "abgelaufen" })
        .eq("creator_id", u.creator_id)
        .eq("telegram_id", u.telegram_id);

      // Nutzer informieren (sofern DM/Chat bekannt)
      if (u.chat_id) {
        await TG("sendMessage", {
          chat_id: Number(u.chat_id),
          text: "❌ Dein VIP ist abgelaufen. Du wurdest aus der Gruppe entfernt. Mit /start → „Jetzt bezahlen“ kannst du jederzeit verlängern.",
        });
      }
      kicked++;
    } catch (e) {
      console.error("[sweeper] kick failed:", { creator_id: u.creator_id, user: u.telegram_id, err: e?.message });
    }
  }
  return { kicked };
}

Deno.serve(async (req) => {
  try {
    // Optional: GET = Dry‑Run Infos
    if (req.method === "GET") {
      const info = { now: new Date().toISOString(), today: todayISO() };
      return new Response(JSON.stringify({ ok: true, info }), { headers: { "content-type": "application/json" } });
    }

    // POST (vom Scheduler): erst warnen, dann kicken
    await warnExpiring(5);
    const { kicked } = await kickExpired();

    return new Response(JSON.stringify({ ok: true, kicked }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error("[sweeper] fatal:", e?.message || e);
    return new Response(JSON.stringify({ ok: false, error: e?.message || String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
});
