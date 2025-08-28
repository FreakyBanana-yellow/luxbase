// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string


// Browser-Client (CSR/Islands)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
auth: {
persistSession: true,
detectSessionInUrl: true,
flowType: 'pkce',
},
})


// Server-Client (API/SSR) – optionales Access-Token für RLS-Kontext
export function makeServerClient(accessToken?: string) {
return createClient(supabaseUrl, supabaseAnonKey, {
global: {
headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
},
})
}


export async function getAccessToken(): Promise<string | null> {
const { data: { session } } = await supabase.auth.getSession()
return session?.access_token ?? null
}
ts
// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;


export const supabase = createClient(supabaseUrl, supabaseKey, {
auth: {
persistSession: true,
detectSessionInUrl: true,
flowType: 'pkce',
},
});