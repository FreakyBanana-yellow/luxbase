import type { APIRoute } from 'astro'
import { supabaseFromCookies } from '@/lib/supabaseServer'

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = supabaseFromCookies({
    get: (k) => cookies.get(k)?.value,
    set: (k, v, o) => cookies.set(k, v, o),
    remove: (k, o) => cookies.delete(k, o),
  })

  const { data: ures } = await supabase.auth.getUser()
  const user = ures?.user
  if (!user) return new Response('Unauthorized', { status: 401 })

  const body = await request.json()
  const { data, error } = await supabase
    .from('profiles')
    .update(body)
    .eq('id', user.id)
    .select()
    .maybeSingle()

  if (error) return new Response(error.message, { status: 400 })
  return new Response(JSON.stringify(data), { status: 200 })
}
