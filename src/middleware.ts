// src/middleware.ts
import type { APIContext, MiddlewareNext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/auth/roles'

/**
 * So wird die Rolle ermittelt:
 * 1) Supabase-User aus Cookies (auth) laden
 * 2) Rolle aus eurer DB laden:
 *    - Primär: creator_config (Spalte "rolle"), Zeile via creator_id = user.id
 *    - Fallback: user.user_metadata.role
 *
 * Passe das ggf. an, falls die Primärtabelle bei dir anders heißt.
 */
async function getSessionRole(context: APIContext): Promise<string | undefined> {
  const cookies = {
    get: (key: string) => context.cookies.get(key)?.value,
    set: (key: string, value: string, options?: Record<string, any>) =>
      context.cookies.set(key, value, options),
    remove: (key: string, options?: Record<string, any>) =>
      context.cookies.delete(key, options),
  }

  const supabase = supabaseFromCookies(cookies)

  // 1) User holen
  const { data: userRes, error: userErr } = await supabase.auth.getUser()
  if (userErr || !userRes?.user) return undefined
  const user = userRes.user

  // 2) Rolle aus DB (creator_config.rolle, Zeile via creator_id = user.id)
  //    Passen falls deine Spalten anders heißen.
  const { data: cfg, error: cfgErr } = await supabase
    .from('creator_config')
    .select('rolle')
    .eq('creator_id', user.id)
    .maybeSingle()

  if (!cfgErr && cfg?.rolle) {
    return String(cfg.rolle)
  }

  // 3) Fallback: user metadata
  const metaRole = (user.user_metadata as any)?.role
  return metaRole ? String(metaRole) : undefined
}

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const pathname = new URL(context.url).pathname

  // Unprotected routes (Marketing etc.)
  const isPublic =
    pathname === '/' ||
    pathname === '/preise' ||
    pathname === '/register' ||
    pathname === '/kontakt' ||
    pathname === '/weare' ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/api/stripe') || // z.B. Webhook o.ä.
    pathname.startsWith('/.netlify/')     // Netlify intern

  if (isPublic) return next()

  const role = await getSessionRole(context)

  // Guard: /dashboard/* -> braucht Login
  if (pathname.startsWith('/dashboard')) {
    if (!role) return context.redirect('/register')
    return next()
  }

  // Guard: /admin/* -> braucht Admin
  if (pathname.startsWith('/admin')) {
    if (!role || !isAdmin(role)) return context.redirect('/dashboard')
    return next()
  }

  // Andere (z. B. /agency) -> optional Login, hier frei:
  return next()
}
