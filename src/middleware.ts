import type { APIContext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { normalizeRole, isAdmin, isAgentur } from '@/lib/auth/roles'

export async function onRequest(ctx: APIContext, next: Function) {
  const url = new URL(ctx.request.url)
  const p = url.pathname

  // öffentlich immer erlauben
  const publicPaths = ['/', '/preise', '/register', '/login', '/kontakt', '/404']
  if (publicPaths.some(base => p === base || p.startsWith(`${base}/`))) {
    return next()
  }

  // Supabase-User & Rolle holen
  const supabase = supabaseFromCookies(ctx.cookies)
  const { data: auth } = await supabase.auth.getUser()
  const user = auth?.user

  // /dashboard/model soll NICHT mehr umleiten (zeigt selbst Login-Hinweis)
  if (p === '/dashboard/model') {
    return next()
  }

  // geschützte Bereiche
  const needsAuth =
    p.startsWith('/dashboard') ||
    p.startsWith('/agency')    ||
    p.startsWith('/admin')     ||
    p.startsWith('/vipbot')    ||
    p.startsWith('/vault')

  if (needsAuth && !user) {
    // lieber auf /login statt /register
    return Response.redirect(new URL('/login', url), 307)
  }

  // Rollenabgleich (nur wenn eingeloggt)
  if (user) {
    // Rolle aus Profil lesen
    const { data: profile } = await supabase
      .from('profiles')
      .select('rolle')
      .eq('id', user.id)
      .maybeSingle()

    const role = normalizeRole(profile?.rolle ?? null)

    // Admin-Bereich
    if (p.startsWith('/admin') && !isAdmin(role)) {
      return Response.redirect(new URL('/dashboard/model', url), 302)
    }
    // Agency-Bereich (Agentur ODER Admin)
    if (p.startsWith('/agency') && !(isAgentur(role) || isAdmin(role))) {
      return Response.redirect(new URL('/dashboard/model', url), 302)
    }
  }

  return next()
}
