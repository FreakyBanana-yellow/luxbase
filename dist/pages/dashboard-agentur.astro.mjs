/* empty css                                       */
import { c as createComponent, a as renderTemplate, b as renderHead } from '../chunks/astro/server_DDPzIoUP.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$DashboardAgentur = createComponent(async ($$result, $$props, $$slots) => {
  createClient(
    undefined                                   ,
    undefined                                        
  );
  return renderTemplate(_a || (_a = __template(['<html lang="de"> <head><title>Luxbase – Agentur-Dashboard</title>', `</head> <body class="bg-luxblack text-white font-sans min-h-screen"> <header class="bg-black border-b border-luxgray p-4 flex justify-between items-center flex-wrap"> <h1 class="text-xl font-serif text-luxgold">LUXBASE – Agenturübersicht</h1> <nav class="flex flex-wrap gap-4 text-sm font-semibold"> <a href="/dashboard" class="hover:text-luxgold">Creator-Übersicht</a> <a href="/dashboard/agentur" class="text-luxgold underline">Agentur-Dashboard</a> <a href="/preise" class="hover:text-luxgold">Pakete & Preise</a> </nav> <div class="flex items-center gap-3 mt-4 md:mt-0"> <button id="logoutBtn" class="border border-luxgold text-luxgold px-3 py-1 rounded hover:bg-luxgold hover:text-black transition">Abmelden</button> </div> </header> <main class="p-6"> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Übersicht Agenturverwaltung --> <div class="bg-zinc-900 border border-luxgold rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">Verwaltete Creator</h3> <p>Aktive Models: <strong>12</strong></p> <p>Gesamtumsatz: <strong>€18.430</strong></p> <p>Lizenzen aktiv: <strong>StageOne + Vault</strong></p> <button onclick="location.href='/dashboard/agentur/creator'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Zu den Creator-Details</button> </div> <!-- VIP-Bot Verwaltung --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">VIP-Bot</h3> <p>Gruppen verknüpft: <strong>3</strong></p> <p>Zahlende Mitglieder: <strong>302</strong></p> <button onclick="location.href='/dashboard/agentur/bot'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Bot-Einstellungen</button> </div> <!-- Vault Verwaltung --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">VaultRoom</h3> <p>Agenturzugänge: <strong>1 Admin, 12 Creator</strong></p> <p>Speicher genutzt: <strong>24 GB / 100 GB</strong></p> <button onclick="location.href='/dashboard/agentur/vault'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Vault öffnen</button> </div> <!-- StageOne --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">StageOne – Multi-Posting</h3> <p>Aktive Creator: <strong>10</strong></p> <p>Geplante Postings: <strong>37</strong></p> <button onclick="location.href='/dashboard/agentur/stageone'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Zu StageOne</button> </div> </div> </main> <script type="module">
      document.getElementById("logoutBtn")?.addEventListener("click", async () => {
        await supabase.auth.signOut();
        location.href = "/";
      });
    </script> </body> </html>`])), renderHead());
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-agentur.astro", void 0);
const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-agentur.astro";
const $$url = "/dashboard-agentur";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DashboardAgentur,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
