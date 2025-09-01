// src/lib/supabase.ts
import { createBrowserClient, type CookieOptions } from '@supabase/ssr'

// Detect runtime
const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'

// Cookie helpers — greifen NUR im Browser auf document zu
function getCookie(name: string) {
  if (!isBrowser) return undefined
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : undefined
}

function setCookie(name: string, value: string, options: CookieOptions = {}) {
  if (!isBrowser) return
  const opts: CookieOptions = { path: '/', sameSite: 'Lax', ...options }
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${opts.path}`,
    `SameSite=${opts.sameSite || 'Lax'}`
  ]
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`)
  if (opts.expires) {
    const e = opts.expires as any
    parts.push(`Expires=${(e?.toUTCString ? e.toUTCString() : e) ?? ''}`)
  }
  if (opts.domain) parts.push(`Domain=${opts.domain}`)
  if (isBrowser && location.protocol === 'https:') parts.push('Secure')
  document.cookie = parts.join('; ')
}

function removeCookie(name: string, options: CookieOptions = {}) {
  // maxAge 0 => löschen
  setCookie(name, '', { ...options, maxAge: 0 })
}

// WICHTIG: Im Server-Kontext liefern die Funktionen harmlose Defaults zurück.
// createBrowserClient darf auf dem Server importiert werden; unsere Cookies
// geben dort einfach nichts zurück.
export const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get: getCookie,
      set: setCookie,
      remove: removeCookie,
    },
  }
)

export default supabase
