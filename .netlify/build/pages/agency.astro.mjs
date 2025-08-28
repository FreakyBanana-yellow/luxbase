/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_hv7oFffr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { c as createAgency } from '../chunks/agency_xOspdbOc.mjs';
import { s as supabase } from '../chunks/supabase___ToHWM0.mjs';
export { renderers } from '../renderers.mjs';

function AgencyCreateForm({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const ag = await createAgency(name.trim());
      setName("");
      onCreated?.(ag);
    } catch (e2) {
      setError(e2?.message || "Fehler beim Anlegen");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex gap-3", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "px-4 py-2 rounded-xl bg-zinc-900 border border-yellow-600/30 text-yellow-50",
        placeholder: "Agenturname",
        value: name,
        onChange: (e) => setName(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx("button", { className: "px-4 py-2 rounded-xl bg-yellow-500 text-black", disabled: loading || !name.trim(), children: "Anlegen" }),
    error && /* @__PURE__ */ jsx("span", { className: "text-red-400", children: error })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: { user } } = await supabase.auth.getUser();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agenturen" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-5xl mx-auto px-4 py-10"> <h1 class="text-2xl md:text-3xl font-semibold text-yellow-400">Agenturen</h1> <p class="mt-2 text-zinc-300">Verwalte Teams & Models.</p> <div class="mt-6 p-4 rounded-2xl bg-zinc-950/60 border border-yellow-600/20"> <h2 class="text-lg text-yellow-300 mb-3">Neue Agentur</h2> ${renderComponent($$result2, "AgencyCreateForm", AgencyCreateForm, { "client:load": true, "onCreated": (ag) => {
    location.href = `/agency/${ag.id}/models`;
  }, "client:component-hydration": "load", "client:component-path": "C:/Users/Anwender/Downloads/luxbase-starter/src/components/AgencyCreateForm.jsx", "client:component-export": "default" })} </div> <div class="mt-8 p-4 rounded-2xl bg-zinc-950/60 border border-yellow-600/20"> <h2 class="text-lg text-yellow-300 mb-3">Meine Agenturen</h2> ${renderComponent($$result2, "MyAgencies", MyAgencies, { "client:load": true, "client:component-hydration": "load" })} </div> </section> ` })} `;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/index.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/agency/index.astro";
const $$url = "/agency";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
