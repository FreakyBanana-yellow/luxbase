// src/lib/profileServer.ts
import { supabaseFromCookies } from '@/lib/supabaseServer'

export type CreatorProfile = {
  id: string
  creator_name: string | null
  bot_paket: string | null         // 'basic' | 'pro' | ...
  has_vipbot: boolean | null
  has_vault: boolean | null
  selfie_check: boolean | null
  show_selfie_gate: boolean | null
}

export async function getProfileFromCookies(cookies: any) {
  const supabase = supabaseFromCookies(cookies)

  const { data: auth } = await supabase.auth.getUser()
  const user = auth?.user
  if (!user) return { user: null, profile: null as CreatorProfile | null }

  const { data, error } = await supabase
    .from('profiles') // ← falls dein Tabellenname anders ist, hier anpassen
    .select('id, creator_name, bot_paket, has_vipbot, has_vault, selfie_check, show_selfie_gate')
    .eq('id', user.id)
    .maybeSingle()

  if (error) return { user, profile: null }
  return { user, profile: (data as CreatorProfile) ?? null }
}
