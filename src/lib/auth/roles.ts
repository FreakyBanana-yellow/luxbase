// src/lib/auth/roles.ts
export type Role = 'creator' | 'agentur' | 'admin' | null | undefined

export const isAdmin   = (r: Role) => r === 'admin'
export const isAgentur = (r: Role) => r === 'agentur' || r === 'agency'
export const isCreator = (r: Role) => r === 'creator'

export function normalizeRole(r?: string | null): Role {
  if (!r) return null
  const v = r.toLowerCase()
  if (v === 'admin') return 'admin'
  if (v === 'agentur' || v === 'agency') return 'agentur'
  if (v === 'creator') return 'creator'
  return null
}
