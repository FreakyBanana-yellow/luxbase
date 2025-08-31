import { isAdmin } from '@/lib/auth/roles'

export function routeAfterLogin(role?: string) {
  if (isAdmin(role)) return '/admin'
  return '/dashboard'
}
