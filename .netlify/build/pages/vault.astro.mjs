/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_hv7oFffr.mjs';
export { renderers } from '../renderers.mjs';

const $$Vault = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Vault \u2013 Dein smarter Content-Tresor" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-4xl mx-auto px-6 py-20 text-center"> <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxgold mb-6">
Vault – Dein smarter Content-Tresor
</h1> <p class="text-lg text-gray-300 mb-10">
Upload. Verwalten. Automatisieren. Der Vault ist dein zentraler Ort für hochwertigen Content – organisiert, analysiert & einsatzbereit.
</p> <img src="/assets/screenshots/vault.png" alt="Vault Screenshot" class="rounded-xl border border-luxgray shadow-xl mx-auto mb-10 max-w-full"> <div class="text-left space-y-4 max-w-3xl mx-auto text-gray-400"> <p>📥 Drag-&-Drop Uploads mit automatischer Kategorisierung.</p> <p>🧠 KI-generierte Captions, Emojis & Hashtags – angepasst je Plattform.</p> <p>📊 Performance-Auswertung nach Veröffentlichung.</p> <p>🔐 Medien-Moderation & Regelcheck mit einem Klick.</p> </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vault.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vault.astro";
const $$url = "/vault";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vault,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
