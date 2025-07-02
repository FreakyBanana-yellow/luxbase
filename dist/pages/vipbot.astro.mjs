/* empty css                                       */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DDPzIoUP.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DlBnAhsg.mjs';
export { renderers } from '../renderers.mjs';

const $$Vipbot = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "VIP Bot \u2013 Dein smarter Telegram-Butler" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-4xl mx-auto px-6 py-20 text-center"> <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxgold mb-6">
VIP Bot – Zugang mit Klasse
</h1> <p class="text-lg text-gray-300 mb-10">
Dein persönlicher Telegram-Butler für exklusive Gruppen, Altersprüfung, Zahlungscheck & automatische VIP-Freischaltung.
</p> <img src="/assets/screenshots/vipbot.png" alt="VIP Bot Screenshot" class="rounded-xl border border-luxgray shadow-xl mx-auto mb-10 max-w-full"> <div class="text-left space-y-4 max-w-3xl mx-auto text-gray-400"> <p>🔞 Alters- & Regelprüfung direkt im Bot-Dialog.</p> <p>🚪 Automatische Gruppenzugänge mit Ablaufdatum (z. B. VIP bis 7 Tage).</p> <p>📥 Verknüpfung mit OnlyFans & Zahlungsservices per Webhook.</p> <p>👑 Individuelle Begrüßungen, Menübuttons & Nutzer-Tracking.</p> </div> </section> ` })}`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vipbot.astro", void 0);

const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/vipbot.astro";
const $$url = "/vipbot";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vipbot,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
