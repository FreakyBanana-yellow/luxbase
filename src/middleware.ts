// src/middleware.ts
import type { APIContext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'

export async function onRequest(ctx: APIContext, next: Function) {
  const url = new URL(ctx.request.url)
  // Trailing Slash entfernen (außer Root)
  const pRaw = url.pathname
  const p = pRaw !== '/' ? pRaw.replace(/\/+$/, '') : '/'

  // öffentlich immer erlauben
  const publicPaths = ['/', '/preise', '/register', '/login', '/kontakt', '/404']
  if (publicPaths.some(base => p === base || p.startsWith(`${base}/`))) {
    return next()
  }

  // ➡️ WICHTIG: Model-Dashboard nie serverseitig umleiten
  if (p === '/dashboard/model') {
    return next()
  }

  // Supabase-User holen
  const supabase = supabaseFromCookies(ctx.cookies)
  const { data: auth } = await supabase.auth.getUser()
  const user = auth?.user

  // geschützte Bereiche
  const needsAuth =
    p.startsWith('/dashboard') ||
    p.startsWith('/agency')    ||
    p.startsWith('/admin')     ||
    p.startsWith('/vipbot')    ||
    p.startsWith('/vault')

  if (needsAuth && !user) {
    return Response.redirect(new URL('/login', url), 307)
  }

  return next()
}
