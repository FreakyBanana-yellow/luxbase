import type { APIRoute } from 'astro'
import { makeServerClient } from '../../../lib/supabase' // ggf. Pfad anpassen

export const GET: APIRoute = async ({ request }) => {
  try {
    const auth = request.headers.get('authorization') ?? ''
    const token = auth.replace(/^Bearer\s+/i, '').trim()
    if (!token) return new Response('Unauthorized', { status: 401 })

    const supabase = makeServerClient(token)
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) return new Response('Unauthorized', { status: 401 })

    const { data, error } = await supabase
      .from('creator_config')
      .select('*')
      .eq('creator_id', user.id) // creator_id = UUID
      .maybeSingle()

    if (error) throw error

    return new Response(JSON.stringify({ profile: data }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    return new Response(e?.message ?? 'Serverfehler', { status: 500 })
  }
}
