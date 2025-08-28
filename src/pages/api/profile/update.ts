import type { APIRoute } from 'astro'
import { makeServerClient } from '../../../lib/supabase' // ggf. Pfad anpassen
import { z } from 'zod'

const Schema = z.object({
  bot_name: z.string().max(60).optional(),
  paypal: z.string().max(120).optional(),
  preis: z.union([z.string(), z.number()]).optional(),
  vip_dauer: z.union([z.string(), z.number()]).optional(),
  gruppe_link: z.string().max(255).optional(),
  regeln_text: z.string().max(5000).optional(),
  welcome_text: z.string().max(5000).optional(),
  reminder_days: z.coerce.number().int().min(0).max(365).optional(),
  selfie_check: z.boolean().optional(),
  bot_paket: z.enum(['basic', 'premium']).optional(),
  show_selfie_gate: z.boolean().optional(),
  telegram_id: z.string().max(60).optional(),
  creator_name: z.string().max(120).optional(),
  email: z.string().email().optional(),
})

export const POST: APIRoute = async ({ request }) => {
  try {
    const auth = request.headers.get('authorization') ?? ''
    const token = auth.replace(/^Bearer\s+/i, '').trim()
    if (!token) return new Response('Unauthorized', { status: 401 })

    const supabase = makeServerClient(token)
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) return new Response('Unauthorized', { status: 401 })

    const body = await request.json()
    const parsed = Schema.parse(body)

    const { data: existing, error: exErr } = await supabase
      .from('creator_config')
      .select('creator_id')
      .eq('creator_id', user.id)
      .maybeSingle()
    if (exErr) throw exErr

    if (!existing) {
      const { error } = await supabase
        .from('creator_config')
        .insert({ creator_id: user.id, ...parsed, updated_at: new Date().toISOString() })
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('creator_config')
        .update({ ...parsed, updated_at: new Date().toISOString() })
        .eq('creator_id', user.id)
      if (error) throw error
    }

    return new Response('OK', { status: 200 })
  } catch (e: any) {
    return new Response(e?.message ?? 'Serverfehler', { status: 400 })
  }
}
