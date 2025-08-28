/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_hv7oFffr.mjs';
export { renderers } from '../renderers.mjs';

const $$Weare = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Wir sind Luxbase \u2013 Creator Tools mit Klasse" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-4xl mx-auto px-6 py-20 text-center"> <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxgold mb-6">
Wir sind Luxbase
</h1> <p class="text-lg text-gray-300 mb-10">
Aus der Szene – für die Szene. Luxbase ist entstanden aus echtem Bedarf, echten Creatorn und echter Erfahrung.
</p> <div class="text-left space-y-6 max-w-3xl mx-auto text-gray-400 leading-relaxed"> <p>
🚀 Was als kleines Automationsprojekt begann, ist heute eine flexible Toolplattform für Creator:innen,
        die mehr wollen: Mehr Übersicht, mehr Automatisierung, mehr Umsatz.
</p> <p>
🤝 Wir arbeiten eng mit realen Models, Cams & Contentcreators zusammen. Deshalb entwickeln wir nur,
        was wirklich gebraucht wird – ohne Schnickschnack.
</p> <p>
✨ Unsere Mission? Tools mit Stil. Sicher, durchdacht & performant. Alles im eleganten Luxbase-Look.
</p> </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/weare.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/weare.astro";
const $$url = "/weare";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Weare,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
