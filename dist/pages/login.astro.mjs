/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CBNIxeik.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_KUFm6zUx.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Login \u2013 Luxbase Dashboard Zugang" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex items-center justify-center h-screen px-6 bg-luxblack"> <div class="bg-luxgray p-8 rounded-2xl shadow-lux max-w-md w-full"> <h2 class="text-3xl font-serif font-bold text-luxgold mb-6 text-center">
Willkommen zurück
</h2> <form class="space-y-5"> <input type="email" placeholder="E-Mail" class="w-full px-4 py-3 rounded bg-black text-white placeholder-gray-400 border border-luxgold focus:outline-none"> <input type="password" placeholder="Passwort" class="w-full px-4 py-3 rounded bg-black text-white placeholder-gray-400 border border-luxgold focus:outline-none"> <button type="submit" class="w-full bg-luxgold text-luxblack font-semibold px-4 py-3 rounded hover:bg-yellow-400 transition">
Einloggen
</button> </form> <p class="text-center text-gray-400 text-sm mt-4">
Noch kein Account? <a href="/register" class="text-yellow-400 hover:underline">Jetzt registrieren</a> </p> </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/login.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
