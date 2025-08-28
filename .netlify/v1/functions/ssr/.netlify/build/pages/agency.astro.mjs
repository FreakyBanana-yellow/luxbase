/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BF73UR92.mjs';
import { jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { c as createAgency, g as getMyAgencies } from '../chunks/agency_CSgzl6Zn.mjs';
export { renderers } from '../renderers.mjs';

function CreateAgencyButton() {
  const [busy, setBusy] = useState(false);
  async function onClick() {
    const name = window.prompt("Name der Agentur:");
    if (!name) return;
    setBusy(true);
    try {
      const created = await createAgency(name);
      window.location.href = `/agency/${encodeURIComponent(created.id)}/models`;
    } catch (e) {
      alert(e?.message || "Fehler beim Anlegen");
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      disabled: busy,
      className: "px-4 py-2 rounded-xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow disabled:opacity-60",
      "aria-busy": busy,
      children: busy ? "Erzeuge…" : "Agentur anlegen"
    }
  );
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const agencies = await getMyAgencies();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agenturen" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-5xl mx-auto px-4 py-10 space-y-6"> <header class="flex items-center justify-between"> <h1 class="text-2xl font-semibold text-yellow-200">Deine Agenturen</h1> ${renderComponent($$result2, "CreateAgencyButton", CreateAgencyButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/CreateAgencyButton.jsx", "client:component-export": "default" })} </header> ${agencies.length === 0 && renderTemplate`<div class="p-6 rounded-2xl bg-zinc-950/60 border border-yellow-600/20 text-zinc-200">
Noch keine Agentur. Lege die erste an.
</div>`} ${agencies.length > 0 && renderTemplate`<ul class="grid gap-3"> ${agencies.map((a) => renderTemplate`<li class="p-4 rounded-2xl bg-zinc-950/60 border border-yellow-600/20 flex items-center justify-between"> <div> <div class="text-yellow-100 font-medium">${a.name}</div> <div class="text-xs text-zinc-400">Rolle: ${a.role}</div> </div> <div class="flex gap-2"> <a${addAttribute(`/agency/${a.id}/models`, "href")} class="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm">
Models
</a> <a${addAttribute(`/agency/join?agency=${encodeURIComponent(a.id)}`, "href")} class="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm">
Invite-Link
</a> </div> </li>`)} </ul>`} </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/index.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/index.astro";
const $$url = "/agency";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
