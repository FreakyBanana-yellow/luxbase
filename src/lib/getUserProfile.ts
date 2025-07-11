import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function getUserProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { session: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("id", session.user.id)
    .single();

  return {
    session,
    profile: profile ?? { name: "Gast", role: "creator" },
  };
}
