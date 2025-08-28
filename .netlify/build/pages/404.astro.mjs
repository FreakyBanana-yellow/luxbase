/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BoG29mqC.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Seite nicht gefunden \u2013 Luxbase" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="text-center py-32"> <h1 class="text-6xl font-bold text-luxgold mb-6">404</h1> <p class="text-lg text-white/80 mb-6">Die Seite konnte nicht gefunden werden.</p> <a href="/" class="px-6 py-2 bg-luxgold text-black font-bold rounded hover:bg-yellow-400 transition">Zurück zur Startseite</a> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/404.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
