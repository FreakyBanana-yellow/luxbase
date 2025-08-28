/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Cz6-6fmN.mjs';
export { renderers } from '../../renderers.mjs';

const $$Notizen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\u{1F4DD} Kommentare & Notizen" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="p-8 text-white"> <h1 class="text-3xl font-bold text-luxgold mb-6">📝 Kommentare & Notizen</h1> <p>Erfasse hier individuelle Hinweise pro Creator:in.</p> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/notizen.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/notizen.astro";
const $$url = "/admin/notizen";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Notizen,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
