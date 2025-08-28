/* empty css                                        */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BoG29mqC.mjs';
import { s as supabase } from '../../chunks/supabase___ToHWM0.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Join = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Join;
  const url = new URL(Astro2.request.url);
  const agency = url.searchParams.get("agency");
  let message = "";
  if (agency) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      message = "Bitte zuerst einloggen.";
    } else {
      const { error } = await supabase.rpc("agency_join_self", { p_agency: agency });
      message = error ? `Beitritt fehlgeschlagen: ${error.message}` : "Du bist der Agentur beigetreten.";
    }
  } else {
    message = "Ung\xFCltiger Link.";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agentur beitreten" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-xl mx-auto px-4 py-10"> <div class="p-4 rounded-xl bg-zinc-900 border border-yellow-600/30">${message}</div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/join.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/join.astro";
const $$url = "/agency/join";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Join,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
