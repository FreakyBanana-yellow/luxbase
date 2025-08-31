<<<<<<< HEAD
// src/lib/supabaseServer.ts
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
import { createServerClient } from '@supabase/ssr'

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!

<<<<<<< HEAD
/**
 * Serverseitiger Supabase-Client für Astro Middleware/API Routen.
 * Erwartet eine Cookie-Bridge mit get/set/remove (Astro liefert die über context.cookies).
 */
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
export function supabaseFromCookies(cookies: {
  get: (key: string) => string | undefined
  set: (key: string, value: string, options?: Record<string, any>) => void
  remove: (key: string, options?: Record<string, any>) => void
}) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
<<<<<<< HEAD
      get: (key: string) => cookies.get(key),
      set: (key: string, value: string, options?: Record<string, any>) =>
        cookies.set(key, value, { path: '/', sameSite: 'Lax', ...options }),
      remove: (key: string, options?: Record<string, any>) =>
        cookies.remove(key, { path: '/', ...options }),
=======
      get: (key) => cookies.get(key),
      set: (key, value, options) => cookies.set(key, value, { path: '/', sameSite: 'Lax', ...options }),
      remove: (key, options) => cookies.remove(key, { path: '/', ...options }),
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
    },
  })
}
