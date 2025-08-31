<<<<<<< HEAD
// src/middleware.ts
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
import type { APIContext, MiddlewareNext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/auth/roles'

<<<<<<< HEAD
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
=======
async function getSessionRole(context: APIContext): Promise<string | undefined> {
  const cookies = {
    get: (key: string) => context.cookies.get(key)?.value,
    set: (key: string, value: string, options?: Record<string, any>) => context.cookies.set(key, value, options),
    remove: (key: string, options?: Record<string, any>) => context.cookies.delete(key, options),
  }
  const supabase = supabaseFromCookies(cookies)

  const { data: ures } = await supabase.auth.getUser()
  const user = ures?.user
  if (!user) return undefined

  // Primary: creator_config.rolle via creator_id = user.id
  const { data: cfg } = await supabase
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
    .from('creator_config')
    .select('rolle')
    .eq('creator_id', user.id)
    .maybeSingle()

<<<<<<< HEAD
  if (!cfgErr && cfg?.rolle) {
    return String(cfg.rolle)
  }

  // 3) Fallback: user metadata
=======
  if (cfg?.rolle) return String(cfg.rolle)

  // Fallback: user metadata
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
  const metaRole = (user.user_metadata as any)?.role
  return metaRole ? String(metaRole) : undefined
}

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const pathname = new URL(context.url).pathname

<<<<<<< HEAD
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
=======
  const PUBLIC = new Set(['/', '/preise', '/register', '/kontakt', '/weare'])
  const isPublic = PUBLIC.has(pathname)
    || pathname.startsWith('/assets/')
    || pathname.startsWith('/public/')
    || pathname.startsWith('/api/stripe')
    || pathname.startsWith('/.netlify/')
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72

  if (isPublic) return next()

  const role = await getSessionRole(context)

<<<<<<< HEAD
  // Guard: /dashboard/* -> braucht Login
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
  if (pathname.startsWith('/dashboard')) {
    if (!role) return context.redirect('/register')
    return next()
  }

<<<<<<< HEAD
  // Guard: /admin/* -> braucht Admin
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
  if (pathname.startsWith('/admin')) {
    if (!role || !isAdmin(role)) return context.redirect('/dashboard')
    return next()
  }

<<<<<<< HEAD
  // Andere (z. B. /agency) -> optional Login, hier frei:
=======
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
  return next()
}
