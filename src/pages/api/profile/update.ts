// src/pages/api/profile/update.ts
}
}
```ts
// src/pages/api/profile/update.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;


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
});


export const POST: APIRoute = async ({ request }) => {
try {
const auth = request.headers.get('authorization') || '';
const token = auth.replace('Bearer ', '').trim();
if (!token) return new Response('Unauthorized', { status: 401 });


const supabase = createClient(supabaseUrl, supabaseKey, {
global: { headers: { Authorization: `Bearer ${token}` } },
});


const { data: userData, error: userErr } = await supabase.auth.getUser();
if (userErr || !userData.user) return new Response('Unauthorized', { status: 401 });


const body = await request.json();
const parsed = Schema.parse(body);


// ensure row exists
const { data: existing } = await supabase
.from('creator_config')
.select('creator_id')
.eq('creator_id', userData.user.id)
.maybeSingle();


let q = supabase.from('creator_config');


if (!existing) {
const { error } = await q.insert({ creator_id: userData.user.id, ...parsed, updated_at: new Date().toISOString() });
if (error) throw error;
} else {
const { error } = await q.update({ ...parsed, updated_at: new Date().toISOString() })
.eq('creator_id', userData.user.id);
if (error) throw error;
}


return new Response('OK', { status: 200 });
} catch (e: any) {
const msg = e?.message || 'Serverfehler';
return new Response(msg, { status: 400 });
}
};