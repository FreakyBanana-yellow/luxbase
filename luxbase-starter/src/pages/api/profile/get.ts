// src/pages/api/profile/get.ts
import type { APIRoute } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'

export const GET: APIRoute = async ({ url, cookies }) => {
  const supabase = supabaseFromCookies({
    get: (k) => cookies.get(k)?.value,
    set: (k, v, o) => cookies.set(k, v, o),
    remove: (k, o) => cookies.delete(k, o),
  })

  // optional ?id=... sonst aktueller User
  const id = url.searchParams.get('id')

  if (id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) return new Response(error.message, { status: 400 })
    return new Response(JSON.stringify(data), { status: 200 })
  }

  // aktueller User
  const { data: ures, error: uerr } = await supabase.auth.getUser()
  if (uerr || !ures?.user) return new Response('Unauthorized', { status: 401 })

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', ures.user.id)
    .maybeSingle()

  if (error) return new Response(error.message, { status: 400 })
  return new Response(JSON.stringify(data), { status: 200 })
}
