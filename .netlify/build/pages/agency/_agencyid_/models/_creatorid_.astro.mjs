/* empty css                                              */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../../../chunks/BaseLayout_hv7oFffr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { s as supabase } from '../../../../chunks/supabase___ToHWM0.mjs';
export { renderers } from '../../../../renderers.mjs';

function ActingAsBanner({ agencyName, creatorName, creatorEmail }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 p-3 rounded-xl border border-yellow-600/30 bg-zinc-900/70 text-yellow-100", children: [
    /* @__PURE__ */ jsx("strong", { children: "Handeln als:" }),
    " ",
    creatorName || "Unbekannt",
    " ",
    /* @__PURE__ */ jsxs("span", { className: "text-zinc-400", children: [
      "(",
      creatorEmail || "—",
      ")"
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "ml-2 text-zinc-400", children: [
      "• Agentur: ",
      agencyName
    ] })
  ] });
}

const $$Astro = createAstro();
const $$creatorId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$creatorId;
  const { agencyId, creatorId } = Astro2.params;
  const { data } = await supabase.from("creator_config").select("creator_name, email").eq("creator_id", creatorId).maybeSingle();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agentur \u2013 Profil (acting as)" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-5xl mx-auto px-4 py-10"> ${renderComponent($$result2, "ActingAsBanner", ActingAsBanner, { "client:load": true, "agencyName": agencyId, "creatorName": data?.creator_name, "creatorEmail": data?.email, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/ActingAsBanner.jsx", "client:component-export": "default" })} <div class="p-6 rounded-2xl bg-zinc-950/60 border border-yellow-600/20"> ${renderComponent($$result2, "AgencyProfile", AgencyProfile, { "client:load": true, "agencyId": agencyId, "creatorId": creatorId, "client:component-hydration": "load" })} </div> </section> ` })} `;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/[agencyId]/models/[creatorId].astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/[agencyId]/models/[creatorId].astro";
const $$url = "/agency/[agencyId]/models/[creatorId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$creatorId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
