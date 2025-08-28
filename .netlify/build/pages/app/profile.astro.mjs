/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_hv7oFffr.mjs';
import { P as ProfileForm } from '../../chunks/ProfileForm_ZuW1vLUJ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Profil \u2013 Luxbase" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-5xl mx-auto px-4 py-10"> <h1 class="text-2xl md:text-3xl font-semibold text-yellow-400">Dein Profil</h1> <p class="mt-2 text-zinc-300">Verwalte hier Anzeigename, E-Mail & Passwort.</p> <div class="mt-8 p-6 rounded-2xl bg-zinc-950/60 border border-yellow-600/20 shadow-xl"> ${renderComponent($$result2, "ProfileForm", ProfileForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/ProfileForm.jsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/app/profile.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/app/profile.astro";
const $$url = "/app/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
