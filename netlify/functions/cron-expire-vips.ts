// netlify/functions/cron-expire-vips.ts
import { createClient } from "@supabase/supabase-js";

export const config = { schedule: "@daily" };

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export default async () => {
  const nowISO = new Date().toISOString();

  const { data: rows, error } = await supabase
    .from("vip_users")
    .select("creator_id, telegram_user_id, vip_bis, status")
    .in("status", ["active", "grace"])
    .lte("vip_bis", nowISO);

  if (error) return new Response(`err ${error.message}`, { status: 500 });

  if (rows?.length) {
    for (const r of rows) {
      await supabase
        .from("vip_users")
        .update({ status: "expired" })
        .eq("creator_id", r.creator_id)
        .eq("telegram_user_id", r.telegram_user_id);
    }
  }
  return new Response("ok");
};
