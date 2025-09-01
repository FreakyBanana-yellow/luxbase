// src/lib/supabaseServer.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'

type AstroCookies = {
  get: (key: string) => { name: string; value: string } | undefined
  set: (key: string, value: string, options?: CookieOptions) => void
  delete?: (key: string, options?: CookieOptions) => void
  remove?: (key: string, options?: CookieOptions) => void
}

export function supabaseFromCookies(cookies: AstroCookies) {
  // ⚠️ WICHTIG: .value lesen!
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
