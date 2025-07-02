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
const $$DashboardModel = createComponent(async ($$result, $$props, $$slots) => {
  createClient(
    undefined                                   ,
    undefined                                        
  );
  return renderTemplate(_a || (_a = __template(['<html lang="de"> <head><title>Luxbase – Dashboard</title>', `</head> <body class="bg-luxblack text-white font-sans min-h-screen"> <header class="bg-black border-b border-luxgray p-4 flex justify-between items-center flex-wrap"> <h1 class="text-xl font-serif text-luxgold">LUXBASE – Übersicht</h1> <nav class="flex flex-wrap gap-4 text-sm font-semibold"> <a href="/dashboard" class="text-luxgold hover:underline">Übersicht</a> <a href="/dashboard/telegrambot" class="hover:text-luxgold">Telegram-Bot</a> <a href="/dashboard/help" class="hover:text-luxgold">Hilfe & Support</a> <a href="/dashboard/account" class="hover:text-luxgold">Account</a> </nav> <div class="flex items-center gap-3 mt-4 md:mt-0"> <div class="relative"> <button id="profileBtn" class="bg-luxgold text-black px-3 py-1 rounded">Mein Profil ▼</button> <div id="profileMenu" class="absolute right-0 mt-2 bg-zinc-900 border border-luxgold rounded shadow-lg hidden text-sm w-48 z-50"> <a href="/dashboard/account" class="block px-4 py-2 hover:bg-zinc-800">Account-Einstellungen</a> <a href="/dashboard/change-password" class="block px-4 py-2 hover:bg-zinc-800">Passwort ändern</a> <a href="/dashboard/2fa" class="block px-4 py-2 hover:bg-zinc-800">2FA einrichten</a> </div> </div> <button id="logoutBtn" class="border border-luxgold text-luxgold px-3 py-1 rounded hover:bg-luxgold hover:text-black transition">Abmelden</button> </div> </header> <main class="p-6"> <div class="grid gap-6 md:grid-cols-3"> <!-- Telegram Bot Card --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">Telegram-Bot</h3> <p>Status: <span class="text-green-400">Aktiv</span></p> <p>VIP Mitglieder: <strong>123</strong></p> <p>Umsatz: <strong>€4.567,89</strong></p> <button onclick="location.href='/dashboard/telegrambot'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Zum Bot Dashboard</button> </div> <!-- Massposting --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">Massposting (Beta)</h3> <p>Kampagnen: <strong>5</strong></p> <p>Reichweite: <strong>3.450</strong></p> <p>Reaktionen: <strong>72 %</strong></p> <button onclick="location.href='/preise'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Preise & Modelle</button> </div> <!-- Vault --> <div class="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg"> <h3 class="text-lg font-bold text-luxgold mb-2">Vault</h3> <p>Inhalte: <strong>456</strong></p> <p>Speicher: <strong>12 GB</strong></p> <p>Backup: <strong>12 Std.</strong></p> <button onclick="location.href='/preise'" class="mt-4 bg-luxgold text-black px-4 py-2 rounded hover:bg-yellow-400 transition">Preise & Modelle</button> </div> </div> </main> <script type="module">
      // Dropdown Menu
      const profileBtn = document.getElementById("profileBtn");
      const profileMenu = document.getElementById("profileMenu");
      profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        if (!profileMenu.contains(e.target) && e.target !== profileBtn) {
          profileMenu.classList.add("hidden");
        }
      });

      // Logout
      document.getElementById("logoutBtn")?.addEventListener("click", async () => {
        await supabase.auth.signOut();
        location.href = "/";
      });
    </script> </body> </html>`])), renderHead());
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-model.astro", void 0);
const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-model.astro";
const $$url = "/dashboard-model";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DashboardModel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
