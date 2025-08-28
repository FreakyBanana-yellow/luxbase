// src/pages/api/profile/get.ts
import type { APIRoute } from 'astro'
import { makeServerClient } from '@/lib/supabase'


export const GET: APIRoute = async ({ request }) => {
try {
const auth = request.headers.get('authorization') || ''
const token = auth.replace('Bearer', '').trim()
if (!token) return new Response('Unauthorized', { status: 401 })


const supabase = makeServerClient(token)


const { data: { user }, error: userErr } = await supabase.auth.getUser()
if (userErr || !user) return new Response('Unauthorized', { status: 401 })


// Vergleich auf UUID-Spalte creator_id
const { data, error } = await supabase
.from('creator_config')
.select('*')
.eq('creator_id', user.id) // user.id ist UUID-String, Spalte muss UUID sein
.maybeSingle()


if (error) throw error


return new Response(JSON.stringify({ profile: data }), {
headers: { 'Content-Type': 'application/json' },
})
} catch (e: any) {
return new Response(e.message || 'Serverfehler', { status: 500 })
}
}
```ts
// src/pages/api/profile/get.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;


export const GET: APIRoute = async ({ request }) => {
try {
const auth = request.headers.get('authorization') || '';
const token = auth.replace('Bearer ', '').trim();
if (!token) return new Response('Unauthorized', { status: 401 });


const supabase = createClient(supabaseUrl, supabaseKey, {
global: { headers: { Authorization: `Bearer ${token}` } },
});


const { data: userData, error: userErr } = await supabase.auth.getUser();
if (userErr || !userData.user) return new Response('Unauthorized', { status: 401 });


const { data, error } = await supabase
.from('creator_config')
.select('*')
.eq('creator_id', userData.user.id)
.maybeSingle();


if (error) throw error;


return new Response(JSON.stringify({ profile: data }), {
headers: { 'Content-Type': 'application/json' },
});
} catch (e: any) {
return new Response(e.message || 'Serverfehler', { status: 500 });
}
};