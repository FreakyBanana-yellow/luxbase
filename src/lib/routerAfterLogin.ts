// src/lib/routerAfterLogin.ts
import { normalizeRole } from '@/lib/auth/roles'

export const routeAfterLogin = (roleRaw?: string | null): string => {
  const role = normalizeRole(roleRaw)
  if (role === 'admin')   return '/admin'
  if (role === 'agentur') return '/agency'
  return '/dashboard/model'
}

export default routeAfterLogin
