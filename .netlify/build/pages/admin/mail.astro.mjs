/* empty css                                        */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Cz6-6fmN.mjs';
export { renderers } from '../../renderers.mjs';

const $$Mail = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\u{1F4EC} Direktnachrichten" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="p-8 text-white"> <h1 class="text-3xl font-bold text-luxgold mb-6">📬 Direktnachrichten</h1> <p>Sende manuell eine Nachricht oder einen Hinweis an ausgewählte Creator:innen.</p> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/mail.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/mail.astro";
const $$url = "/admin/mail";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mail,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
