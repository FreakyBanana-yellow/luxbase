// src/lib/supabaseServer.ts
import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'

// Hilfsfunktion: Server-Client aus Astro-Cookies erzeugen
export function supabaseFromCookies(cookies: {
  get: (key: string) => string | undefined
  set: (key: string, value: string, options?: CookieOptions) => void
  delete?: (key: string, options?: CookieOptions) => void
  remove?: (key: string, options?: CookieOptions) => void
}) {
  const cookieAdapter = {
    get: (key: string) => cookies.get(key),
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

export async function getMyAgenciesServer(astroCookies: any) {
  const supabase = supabaseFromCookies(astroCookies)
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) return []

  const { data, error } = await supabase
    .from('agencies')
    .select('*')
    .eq('owner_id', auth.user.id)

  if (error) throw error
  return data ?? []
}
