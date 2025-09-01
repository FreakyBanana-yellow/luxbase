// src/lib/auth/getRoleServer.ts
import type { CookieOptions } from '@supabase/ssr'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { normalizeRole, type Role } from '@/lib/auth/roles'

type AstroCookies = {
  get: (key: string) => { name: string; value: string } | undefined
  set: (key: string, value: string, options?: CookieOptions) => void
  delete?: (key: string, options?: CookieOptions) => void
  remove?: (key: string, options?: CookieOptions) => void
}

export async function getRoleFromServer(cookies: AstroCookies): Promise<Role> {
  const supabase = supabaseFromCookies(cookies)
  const { data: userRes } = await supabase.auth.getUser()
  const user = userRes?.user
  if (!user) return null

  // Try user_metadata first
  const metaRole = (user.user_metadata?.role || user.user_metadata?.account_type || '').toString()
  let role: Role = normalizeRole(metaRole)

  if (!role) {
    // Fallback to user_profile table if available
    const { data: prof } = await supabase
      .from('user_profile')
      .select('account_type, role')
      .eq('user_id', user.id)
      .maybeSingle()

    const dbRole = (prof?.role || prof?.account_type || '').toString()
    role = normalizeRole(dbRole)
  }

  return role
}
