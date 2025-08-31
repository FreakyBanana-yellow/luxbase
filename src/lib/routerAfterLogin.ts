<<<<<<< HEAD
// src/lib/routerAfterLogin.ts
import { isAdmin } from '@/lib/auth/roles'

export function routeAfterLogin(role?: string) {
  // Admins landen im Adminbereich, alle anderen im Dashboard
=======
import { isAdmin } from '@/lib/auth/roles'

export function routeAfterLogin(role?: string) {
>>>>>>> d4285687cafc30328465225db224b28b3b4c4b72
  if (isAdmin(role)) return '/admin'
  return '/dashboard'
}
