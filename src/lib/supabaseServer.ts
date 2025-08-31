// src/lib/supabaseServer.ts
import { createServerClient } from '@supabase/ssr'

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!

export function supabaseFromCookies(cookies: {
  get: (key: string) => string | undefined
  set: (key: string, value: string, options?: Record<string, any>) => void
  remove: (key: string, options?: Record<string, any>) => void
}) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get: (key) => cookies.get(key),
      set: (key, value, options) =>
        cookies.set(key, value, { path: '/', sameSite: 'Lax', ...options }),
      remove: (key, options) =>
        cookies.remove(key, { path: '/', ...options }),
    },
  })
}
