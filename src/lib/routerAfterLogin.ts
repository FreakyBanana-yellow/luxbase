
// src/lib/routerAfterLogin.ts
import { isAdmin } from '@/lib/auth/roles'

export function routeAfterLogin(role?: string) {
  // Admins landen im Adminbereich, alle anderen im Dashboard

import { isAdmin } from '@/lib/auth/roles'

export function routeAfterLogin(role?: string) {

  if (isAdmin(role)) return '/admin'
  return '/dashboard'
}
