import { s as supabase } from './supabase___ToHWM0.mjs';

async function getMyAgencies() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from("agency_member").select("agency_id, role, agency:agency_id ( id, name )").eq("user_id", String(user.id));
  if (error) throw error;
  return (data || []).map((m) => ({
    id: m.agency?.id,
    name: m.agency?.name,
    role: m.role
  })).filter(Boolean);
}
async function createAgency(name) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht eingeloggt");
  const { data, error } = await supabase.from("agency").insert({ name, owner_user_id: String(user.id) }).select("id, name").single();
  if (error) throw error;
  const { error: mErr } = await supabase.from("agency_member").insert({ agency_id: data.id, user_id: String(user.id), role: "admin" });
  if (mErr) throw mErr;
  return data;
}
async function listAgencyModels(agencyId) {
  const { data: links, error: lErr } = await supabase.from("agency_creator").select("creator_id").eq("agency_id", agencyId);
  if (lErr) throw lErr;
  const ids = (links || []).map((l) => l.creator_id);
  if (!ids.length) return [];
  const { data, error } = await supabase.from("creator_config").select("creator_id, creator_name, email").in("creator_id", ids);
  if (error) throw error;
  return data || [];
}
async function writeAudit(entry) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("agency_audit_log").insert({
    agency_id: entry.agency_id,
    actor_user_id: String(user.id),
    target_creator_id: entry.target_creator_id ?? null,
    action: entry.action,
    path: entry.path ?? null,
    old_value: entry.old_value ?? null,
    new_value: entry.new_value ?? null
  });
}

export { createAgency as c, getMyAgencies as g, listAgencyModels as l, writeAudit as w };
