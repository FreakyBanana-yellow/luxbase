// src/lib/profileServer.ts
import { supabaseFromCookies } from '@/lib/supabaseServer'

export type CreatorProfile = {
  id: string
  rolle: 'creator' | 'agentur' | 'admin' | null
  creator_name: string | null
  bot_paket: string | null
  has_vipbot: boolean | null
  has_vault: boolean | null
  selfie_check: boolean | null
  show_selfie_gate: boolean | null
}

export async function getProfileFromCookies(cookies: any) {
  const supabase = supabaseFromCookies(cookies)

  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) {
    return { user: null, profile: null as CreatorProfile | null }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, rolle, creator_name, bot_paket, has_vipbot, has_vault, selfie_check, show_selfie_gate')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (error) {
    return { user: auth.user, profile: null as CreatorProfile | null }
  }

  return { user: auth.user, profile: (data as CreatorProfile) ?? null }
}
