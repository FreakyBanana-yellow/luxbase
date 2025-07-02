/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CBNIxeik.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_KUFm6zUx.mjs';
export { renderers } from '../renderers.mjs';

const $$Kontakt = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Kontakt \u2013 Schreib uns direkt" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-3xl mx-auto px-6 py-20 text-center"> <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxgold mb-6">
Fragen? Anregungen? Let’s talk.
</h1> <p class="text-lg text-gray-300 mb-10">
Schreib uns direkt – wir antworten in der Regel innerhalb von 24h.
</p> <form class="bg-luxgray p-8 rounded-xl shadow-lux text-left space-y-6"> <input type="text" name="name" placeholder="Dein Name" class="w-full px-4 py-3 rounded bg-black text-white placeholder-gray-400 border border-luxgold focus:outline-none"> <input type="email" name="email" placeholder="Deine E-Mail" class="w-full px-4 py-3 rounded bg-black text-white placeholder-gray-400 border border-luxgold focus:outline-none"> <textarea name="message" rows="5" placeholder="Deine Nachricht..." class="w-full px-4 py-3 rounded bg-black text-white placeholder-gray-400 border border-luxgold focus:outline-none"></textarea> <button type="submit" class="bg-luxgold text-luxblack font-semibold px-6 py-3 rounded shadow hover:bg-yellow-400 transition">
Nachricht senden
</button> </form> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/kontakt.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/kontakt.astro";
const $$url = "/kontakt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Kontakt,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
