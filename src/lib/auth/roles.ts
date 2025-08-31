// src/lib/auth/roles.ts
export type Role = 'admin' | 'creator' | 'agency'

export const isAdmin = (role?: string): boolean => role === 'admin'
export const isCreator = (role?: string): boolean => role === 'creator'
export const isAgency = (role?: string): boolean => role === 'agency'
