/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DDPzIoUP.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DlBnAhsg.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dashboard – Luxbase" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section class="min-h-[60vh] flex flex-col items-center justify-center gap-6"> <svg class="animate-spin h-10 w-10 text-luxgold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path> </svg> <p class="text-luxgold/80">Dashboard wird geladen …</p> </section>  <script type="module">\n    import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";\n\n    const supabase = createClient(\n      import.meta.env.PUBLIC_SUPABASE_URL,\n      import.meta.env.PUBLIC_SUPABASE_ANON_KEY\n    );\n\n    // Aktuelle Session holen\n    const { data: { session } } = await supabase.auth.getSession();\n\n    if (!session) {\n      // nicht eingeloggt → zurück zur Startseite\n      window.location.replace("/");\n    } else {\n      const role = session.user?.user_metadata?.role ?? "creator";\n      if (role === "agentur") {\n        window.location.replace("/dashboard-agentur");\n      } else {\n        window.location.replace("/dashboard-model");\n      }\n    }\n  </script> '])), maybeRenderHead()) })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard.astro", void 0);
const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
