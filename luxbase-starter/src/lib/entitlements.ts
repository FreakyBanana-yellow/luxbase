// src/lib/entitlements.ts
import type { CreatorProfile } from '@/lib/profileServer'

export type Feature =
  | 'vipbot_dashboard'
  | 'vipbot_settings'
  | 'vault'
  | 'selfie_gate'

export type Entitlements = Record<Feature, boolean>

/**
 * Regeln:
 * - vipbot_dashboard: wenn has_vipbot = true
 * - vipbot_settings:  wenn has_vipbot = true UND bot_paket IN ('pro','enterprise')
 * - vault:            wenn has_vault = true
 * - selfie_gate:      wenn show_selfie_gate = true (UI-Schalter)
 */
export function entitlementsFromProfile(p?: CreatorProfile | null): Entitlements {
  const pkg = (p?.bot_paket || '').toLowerCase()
  const isPro = pkg === 'pro' || pkg === 'enterprise'

  return {
    vipbot_dashboard: !!p?.has_vipbot,
    vipbot_settings:  !!p?.has_vipbot && isPro,
    vault:            !!p?.has_vault,
    selfie_gate:      !!p?.show_selfie_gate,
  }
}
