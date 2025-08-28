// src/lib/routeAfterLogin.ts
import { supabase } from './supabase';

export async function routeAfterLogin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { location.href = '/login'; return; }

  // 1) Bevorzugt: Mitgliedschaft in einer Agentur?
  const { data: membership } = await supabase
    .from('agency_member')
    .select('agency_id')
    .eq('user_id', user.id)
    .limit(1);

  if (membership && membership.length > 0) {
    location.href = '/dashboard-agentur';
    return;
  }

  // 2) Sonst: Profil-Typ (Fallback auf user_metadata)
  const { data: profile } = await supabase
    .from('user_profile')
    .select('account_type')
    .eq('user_id', user.id)
    .maybeSingle();

  const type = String(profile?.account_type || (user.user_metadata as any)?.account_type || '').toLowerCase();

  if (type === 'agency') {
    location.href = '/dashboard-agentur';
  } else {
    location.href = '/dashboard-model';
  }
}
