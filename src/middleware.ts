import type { APIContext, MiddlewareNext } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'
import { isAdmin } from '@/lib/auth/roles'

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
    .from('creator_config')
    .select('rolle')
    .eq('creator_id', user.id)
    .maybeSingle()

  if (cfg?.rolle) return String(cfg.rolle)

  // Fallback: user metadata
  const metaRole = (user.user_metadata as any)?.role
  return metaRole ? String(metaRole) : undefined
}

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const pathname = new URL(context.url).pathname

  const PUBLIC = new Set(['/', '/preise', '/register', '/kontakt', '/weare'])
  const isPublic = PUBLIC.has(pathname)
    || pathname.startsWith('/assets/')
    || pathname.startsWith('/public/')
    || pathname.startsWith('/api/stripe')
    || pathname.startsWith('/.netlify/')

  if (isPublic) return next()

  const role = await getSessionRole(context)

  if (pathname.startsWith('/dashboard')) {
    if (!role) return context.redirect('/register')
    return next()
  }

  if (pathname.startsWith('/admin')) {
    if (!role || !isAdmin(role)) return context.redirect('/dashboard')
    return next()
  }

  return next()
}
