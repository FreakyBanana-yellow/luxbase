import { m as makeServerClient } from '../../../chunks/supabase___ToHWM0.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const auth = request.headers.get("authorization") ?? "";
    const token = auth.replace(/^Bearer\s+/i, "").trim();
    if (!token) return new Response("Unauthorized", { status: 401 });
    const supabase = makeServerClient(token);
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return new Response("Unauthorized", { status: 401 });
    const { data, error } = await supabase.from("creator_config").select("*").eq("creator_id", user.id).maybeSingle();
    if (error) throw error;
    return new Response(JSON.stringify({ profile: data }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(e?.message ?? "Serverfehler", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
