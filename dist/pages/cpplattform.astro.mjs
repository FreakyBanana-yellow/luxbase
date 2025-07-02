/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CBNIxeik.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_KUFm6zUx.mjs';
export { renderers } from '../renderers.mjs';

const $$Cpplattform = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Multiplattform-Posting \u2013 Poste auf allen Plattformen gleichzeitig" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-4xl mx-auto px-6 py-20 text-center"> <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxgold mb-6">
Multiplattform-Posting leicht gemacht
</h1> <p class="text-lg text-gray-300 mb-10">
Spare Zeit & Nerven: Veröffentliche deine Inhalte automatisch auf OnlyFans, Fansly, BestFans & mehr.
</p> <img src="/assets/screenshots/multiplattform.png" alt="Multiplattform Screenshot" class="rounded-xl border border-luxgray shadow-xl mx-auto mb-10 max-w-full"> <div class="text-left space-y-4 max-w-3xl mx-auto text-gray-400"> <p>✨ Inhalte nur 1x hochladen – und gleichzeitig auf mehreren Plattformen posten.</p> <p>🧠 Automatische Anpassung von Captions, Hashtags & Formaten.</p> <p>📅 Posts planen & recyceln mit dem smarten Kampagnenmanager.</p> </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/cpplattform.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/cpplattform.astro";
const $$url = "/cpplattform";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cpplattform,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
