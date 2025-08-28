/* empty css                                           */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_hv7oFffr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import { l as listAgencyModels, i as inviteLink } from '../../../chunks/agency_xOspdbOc.mjs';
export { renderers } from '../../../renderers.mjs';

function AgencyModelsTable({ agencyId }) {
  const [rows, setRows] = React.useState([]);
  const [q, setQ] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const data = await listAgencyModels(agencyId);
      setRows(data);
    })();
  }, [agencyId]);
  const filtered = rows.filter((r) => (r.creator_name || "").toLowerCase().includes(q.toLowerCase()) || (r.email || "").toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("input", { placeholder: "Suche Name/Email", value: q, onChange: (e) => setQ(e.target.value), className: "w-full px-3 py-2 rounded bg-zinc-900 border border-yellow-600/30" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "text-yellow-300/80", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Aktion" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        filtered.map((r) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-yellow-600/10", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2", children: r.creator_name || "—" }),
          /* @__PURE__ */ jsx("td", { className: "py-2", children: r.email || "—" }),
          /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsx("a", { href: `/agency/${agencyId}/models/${r.creator_id}`, className: "px-3 py-1 rounded bg-yellow-500 text-black", children: "Öffnen" }) })
        ] }, r.creator_id)),
        filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "py-6 text-zinc-400", colSpan: 3, children: "Keine Einträge" }) })
      ] })
    ] }) })
  ] });
}

function AgencyInviteLink({ agencyId }) {
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    (async () => setUrl(await inviteLink(agencyId)))();
  }, [agencyId]);
  if (!agencyId) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("input", { readOnly: true, value: url, className: "flex-1 px-3 py-2 rounded bg-zinc-900 border border-yellow-600/30" }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      navigator.clipboard?.writeText(url);
    }, className: "px-3 py-2 rounded bg-zinc-800 border border-yellow-600/30", children: "Kopieren" })
  ] });
}

const $$Astro = createAstro();
const $$Models = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Models;
  const { agencyId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agentur \u2013 Models" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-6xl mx-auto px-4 py-10"> <div class="flex items-center justify-between"> <h1 class="text-2xl md:text-3xl font-semibold text-yellow-400">Models</h1> <div class="w-[420px]"> ${renderComponent($$result2, "AgencyInviteLink", AgencyInviteLink, { "client:load": true, "agencyId": agencyId, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/AgencyInviteLink.jsx", "client:component-export": "default" })} </div> </div> <div class="mt-6 p-4 rounded-2xl bg-zinc-950/60 border border-yellow-600/20"> ${renderComponent($$result2, "AgencyModelsTable", AgencyModelsTable, { "client:load": true, "agencyId": agencyId, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/AgencyModelsTable.jsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/[agencyId]/models.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/[agencyId]/models.astro";
const $$url = "/agency/[agencyId]/models";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Models,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
