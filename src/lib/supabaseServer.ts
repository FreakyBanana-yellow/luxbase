// src/lib/supabaseServer.ts
import { createServerClient } from '@supabase/ssr'

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!

/**
 * Serverseitiger Supabase-Client für Astro Middleware/API Routen.
 * Erwartet eine Cookie-Bridge mit get/set/remove (Astro liefert die über context.cookies).
 */
export function supabaseFromCookies(cookies: {
  get: (key: string) => string | undefined
  set: (key: string, value: string, options?: Record<string, any>) => void
  remove: (key: string, options?: Record<string, any>) => void
}) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get: (key: string) => cookies.get(key),
      set: (key: string, value: string, options?: Record<string, any>) =>
        cookies.set(key, value, { path: '/', sameSite: 'Lax', ...options }),
      remove: (key: string, options?: Record<string, any>) =>
        cookies.remove(key, { path: '/', ...options }),
    },
  })
}
