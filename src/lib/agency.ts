// src/lib/agency.ts
import { supabase } from '@/lib/supabase.ts'


// Hole alle Agenturen, in denen der Nutzer Mitglied ist
export async function getMyAgencies(): Promise<Array<{id: string; name: string; role: string}>> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('agency_member')
    .select('agency_id, role, agency:agency_id ( id, name )')
    .eq('user_id', String(user.id)) // IDs als text
  if (error) throw error
  return (data || []).map((m: any) => ({
    id: m.agency?.id,
    name: m.agency?.name,
    role: m.role,
  })).filter(Boolean)
}

// Lege eine Agentur an und trage den Owner als admin-Mitglied ein
export async function createAgency(name: string): Promise<{id: string; name: string}> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Nicht eingeloggt')

  const { data, error } = await supabase
    .from('agency')
    .insert({ name, owner_user_id: String(user.id) })
    .select('id, name')
    .single()
  if (error) throw error

  const { error: mErr } = await supabase
    .from('agency_member')
    .insert({ agency_id: data.id, user_id: String(user.id), role: 'admin' })
  if (mErr) throw mErr

  return data
}

// Liste der Models (creator_config) für eine Agentur
export async function listAgencyModels(agencyId: string): Promise<Array<{creator_id:string; creator_name?:string; email?:string}>> {
  // Creator-IDs der Agentur holen
  const { data: links, error: lErr } = await supabase
    .from('agency_creator')
    .select('creator_id')
    .eq('agency_id', agencyId)
  if (lErr) throw lErr

  const ids = (links || []).map(l => l.creator_id)
  if (!ids.length) return []

  // Leichte Profilinfos laden
  const { data, error } = await supabase
    .from('creator_config')
    .select('creator_id, creator_name, email')
    .in('creator_id', ids)
  if (error) throw error

  return data || []
}

// Einladungs-Link erzeugen (für /agency/join?agency=...)
export async function inviteLink(agencyId: string): Promise<string> {
  return `/agency/join?agency=${encodeURIComponent(agencyId)}`
}

// Audit-Log schreiben (optional nach Änderungen)
export async function writeAudit(entry: {
  agency_id: string
  action: string
  target_creator_id?: string
  path?: string
  old_value?: any
  new_value?: any
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('agency_audit_log').insert({
    agency_id: entry.agency_id,
    actor_user_id: String(user.id),
    target_creator_id: entry.target_creator_id ?? null,
    action: entry.action,
    path: entry.path ?? null,
    old_value: entry.old_value ?? null,
    new_value: entry.new_value ?? null,
  })
}