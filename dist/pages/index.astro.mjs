/* empty css                                       */
import { c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DDPzIoUP.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DlBnAhsg.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <!-- Supabase\u2011Client im Browser verf\xFCgbar machen --> <script type="module">
  import { supabase } from '/src/lib/supabase';
  window.supabase = supabase;
<\/script>`])), renderComponent($$result, "Layout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section id="tools" class="max-w-6xl mx-auto grid gap-20 md:gap-32 py-24 px-6"> <!-- BaaS / VIP‑Bot --------------------------------------- --> <div class="grid md:grid-cols-2 gap-10 items-center"> <img src="/baas.png" alt="BaaS – Automatisiere deine VIP‑Gruppe" class="mx-auto max-w-md" loading="lazy"> <div class="text-center md:text-left"> <h2 class="text-4xl font-serif font-bold text-luxgold mb-6">
BaaS – Dein VIP‑Bot
</h2> <p class="text-lg leading-relaxed mb-8">
Nutze unseren VIP‑Bot, um deine Telegram‑Gruppe voll­automatisiert zu
          verwalten, Altersabfragen durchzuführen und zahlende Member
          freizuschalten.
</p> <a href="/vipbot" class="inline-block px-8 py-3 bg-luxgold text-luxblack font-semibold rounded-lg hover:bg-yellow-400 transition">Mehr erfahren</a> </div> </div> <!-- VaultRoom --------------------------------------------- --> <div class="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse"> <img src="/vaultroom.png" alt="VaultRoom – Content‑Safe" class="mx-auto max-w-md" loading="lazy"> <div class="text-center md:text-left"> <h2 class="text-4xl font-serif font-bold text-luxgold mb-6">
VaultRoom – Content‑Safe
</h2> <p class="text-lg leading-relaxed mb-8">
Ordne, plane und archiviere dein Roh‑Material sicher an einem Ort.
          Schluss mit Chaos – nutze KI‑gestützte Tags, Versionierung und
          Bulk‑Uploads.
</p> <a href="/vault" class="inline-block px-8 py-3 bg-luxgold text-luxblack font-semibold rounded-lg hover:bg-yellow-400 transition">Mehr erfahren</a> </div> </div> <!-- StageOne ---------------------------------------------- --> <div class="grid md:grid-cols-2 gap-10 items-center"> <img src="/stageone.png" alt="StageOne – Multi‑Platform Scheduling" class="mx-auto max-w-md" loading="lazy"> <div class="text-center md:text-left"> <h2 class="text-4xl font-serif font-bold text-luxgold mb-6">
StageOne – Multi‑Posting
</h2> <p class="text-lg leading-relaxed mb-8">
Plane Posts, Re‑Use Captions und veröffentliche parallel auf
          OnlyFans, Fansly & Co. Spare Zeit und steigere Reichweite mit einem
          Klick.
</p> <a href="/cpplattform" class="inline-block px-8 py-3 bg-luxgold text-luxblack font-semibold rounded-lg hover:bg-yellow-400 transition">Mehr erfahren</a> </div> </div> </section> ` }));
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/index.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
