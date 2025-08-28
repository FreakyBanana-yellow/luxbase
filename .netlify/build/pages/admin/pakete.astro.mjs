/* empty css                                        */
import { c as createComponent, e as renderHead, d as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const PaketVerwaltung = (await import('../../chunks/PaketVerwaltung_PKjX1ngR.mjs')).default;
  return renderTemplate`<html lang="de"> <head><meta charset="UTF-8"><title>Paketverwaltung – Luxbase Admin</title><meta name="viewport" content="width=device-width, initial-scale=1.0">${renderHead()}</head> <body class="bg-black text-white min-h-screen"> <main class="max-w-7xl mx-auto px-4 py-6"> ${renderComponent($$result, "PaketVerwaltung", PaketVerwaltung, { "adminName": "FreakyBanana" })} </main> </body></html>`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/pakete/index.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/admin/pakete/index.astro";
const $$url = "/admin/pakete";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
