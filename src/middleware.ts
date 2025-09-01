// src/middleware.ts
import type { APIContext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { normalizeRole, isAdmin, isAgentur } from '@/lib/auth/roles'

export async function onRequest(ctx: APIContext, next: Function) {
  const url = new URL(ctx.request.url)
  const pRaw = url.pathname
  const p = pRaw !== '/' ? pRaw.replace(/\/+$/, '') : '/'

  const publicPaths = ['/', '/preise', '/register', '/login', '/kontakt', '/404']
  if (publicPaths.some(base => p === base || p.startsWith(`${base}/`))) {
    return next()
  }

  if (p === '/dashboard/model') {
    return next()
  }

  const supabase = supabaseFromCookies(ctx.cookies as any)
  const { data: auth } = await supabase.auth.getUser()
  const user = auth?.user

  const needsAuth =
    p.startsWith('/dashboard') ||
    p.startsWith('/agency')    ||
    p.startsWith('/admin')     ||
    p.startsWith('/vipbot')    ||
    p.startsWith('/vault')

  if (needsAuth && !user) {
    return Response.redirect(new URL('/login', url), 307)
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('rolle')
      .eq('id', user.id)
      .maybeSingle()

    const role = normalizeRole(profile?.rolle ?? null)

    if (p.startsWith('/admin') && !isAdmin(role)) {
      return Response.redirect(new URL('/dashboard/model', url), 302)
    }
    if (p.startsWith('/agency') && !(isAgentur(role) || isAdmin(role))) {
      return Response.redirect(new URL('/dashboard/model', url), 302)
    }
  }

  return next()
}
