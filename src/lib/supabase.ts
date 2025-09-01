// src/lib/supabase.ts
import { createBrowserClient, type CookieOptions } from '@supabase/ssr'

// kleine Cookie-Utils für den Browser
function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : undefined
}

function setCookie(name: string, value: string, options: CookieOptions = {}) {
  const opts: CookieOptions = { path: '/', sameSite: 'Lax', ...options }
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${opts.path}`,
    `SameSite=${opts.sameSite || 'Lax'}`
  ]
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`)
  if (opts.expires) parts.push(`Expires=${(opts.expires as Date).toUTCString?.() ?? opts.expires}`)
  if (opts.domain) parts.push(`Domain=${opts.domain}`)
  if (location.protocol === 'https:') parts.push('Secure')
  document.cookie = parts.join('; ')
}

function removeCookie(name: string, options: CookieOptions = {}) {
  setCookie(name, '', { ...options, maxAge: 0 })
}

// ⬇️ Browser-Client, der Sessions in Cookies schreibt
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
