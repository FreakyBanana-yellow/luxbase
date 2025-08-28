/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, b as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BoG29mqC.mjs';
import { g as getMyAgencies } from '../chunks/agency_DVG68g-R.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const agencies = await getMyAgencies();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Agenturen" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="max-w-5xl mx-auto px-4 py-10 space-y-6"> <header class="flex items-center justify-between"> <h1 class="text-2xl font-semibold text-yellow-200">Deine Agenturen</h1> <button id="createAgencyBtn" class="px-4 py-2 rounded-xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow">\nAgentur anlegen\n</button> </header> ', ` <!-- Kleines Client-Script f\xFCr "Agentur anlegen" --> <script type="module">
      import { createAgency } from '/src/lib/agency.ts';

      const btn = document.getElementById('createAgencyBtn');
      btn?.addEventListener('click', async () => {
        const name = window.prompt('Name der Agentur:');
        if (!name) return;
        btn.disabled = true;
        btn.textContent = 'Erstelle\u2026';
        try {
          const created = await createAgency(name);
          // nach Erfolg zur Models-\xDCbersicht springen
          window.location.href = \`/agency/\${encodeURIComponent(created.id)}/models\`;
        } catch (e) {
          alert(e?.message || 'Fehler beim Anlegen');
          btn.disabled = false;
          btn.textContent = 'Agentur anlegen';
        }
      });
    <\/script> </section> `], [" ", '<section class="max-w-5xl mx-auto px-4 py-10 space-y-6"> <header class="flex items-center justify-between"> <h1 class="text-2xl font-semibold text-yellow-200">Deine Agenturen</h1> <button id="createAgencyBtn" class="px-4 py-2 rounded-xl bg-yellow-500/90 hover:bg-yellow-400 text-black font-medium shadow">\nAgentur anlegen\n</button> </header> ', ` <!-- Kleines Client-Script f\xFCr "Agentur anlegen" --> <script type="module">
      import { createAgency } from '/src/lib/agency.ts';

      const btn = document.getElementById('createAgencyBtn');
      btn?.addEventListener('click', async () => {
        const name = window.prompt('Name der Agentur:');
        if (!name) return;
        btn.disabled = true;
        btn.textContent = 'Erstelle\u2026';
        try {
          const created = await createAgency(name);
          // nach Erfolg zur Models-\xDCbersicht springen
          window.location.href = \\\`/agency/\\\${encodeURIComponent(created.id)}/models\\\`;
        } catch (e) {
          alert(e?.message || 'Fehler beim Anlegen');
          btn.disabled = false;
          btn.textContent = 'Agentur anlegen';
        }
      });
    <\/script> </section> `])), maybeRenderHead(), agencies.length === 0 ? renderTemplate`<div class="p-6 rounded-2xl bg-zinc-950/60 border border-yellow-600/20 text-zinc-200">
Noch keine Agentur. Lege die erste an.
</div>` : renderTemplate`<ul class="grid gap-3"> ${agencies.map((a) => renderTemplate`<li class="p-4 rounded-2xl bg-zinc-950/60 border border-yellow-600/20 flex items-center justify-between"> <div> <div class="text-yellow-100 font-medium">${a.name}</div> <div class="text-xs text-zinc-400">Rolle: ${a.role}</div> </div> <div class="flex gap-2"> <a${addAttribute(`/agency/${a.id}/models`, "href")} class="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm">
Models
</a> <a${addAttribute(`/agency/join?agency=${encodeURIComponent(a.id)}`, "href")} class="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm">
Invite-Link
</a> </div> </li>`)} </ul>`) })}`;
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
