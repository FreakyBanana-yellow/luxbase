// src/lib/supabaseServer.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'

type AstroCookies = {
  get: (key: string) => { name: string; value: string } | undefined
  set: (key: string, value: string, options?: CookieOptions) => void
  delete?: (key: string, options?: CookieOptions) => void
  remove?: (key: string, options?: CookieOptions) => void
}

export function supabaseFromCookies(cookies: AstroCookies) {
  const cookieAdapter = {
    get: (key: string) => cookies.get(key)?.value,
    set: (key: string, value: string, options?: CookieOptions) =>
      cookies.set(key, value, { path: '/', sameSite: 'Lax', ...options }),
    remove: (key: string, options?: CookieOptions) =>
      (cookies.delete ?? cookies.remove)?.(key, { path: '/', ...options }),
  }

  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL!,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieAdapter as any }
  )
}

export async function getMyAgenciesServer(cookies: AstroCookies) {
  const supabase = supabaseFromCookies(cookies)
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth?.user) return []

  const { data, error } = await supabase
    .from('agencies')
    .select('*')
    .eq('owner_id', auth.user.id)

  if (error) throw error
  return data ?? []
}

export async function getServerUser(cookies: AstroCookies) {
  const supabase = supabaseFromCookies(cookies)
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) return null
  return data.user
}
