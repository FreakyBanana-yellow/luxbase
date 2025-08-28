/* empty css                                     */
import { c as createComponent, r as renderTemplate, e as renderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$DashboardAgentur = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="de"> <head><title>Luxbase – Agentur-Dashboard</title><script type="module">\n      import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";\n      // Browser-Client\n      const supabase = createClient(\n        import.meta.env.PUBLIC_SUPABASE_URL,\n        import.meta.env.PUBLIC_SUPABASE_ANON_KEY\n      );\n\n      async function guardAgencyOnly() {\n        const { data: { user } } = await supabase.auth.getUser();\n        if (!user) { location.href = "/login"; return; }\n\n        // Mitgliedschaft?\n        const { data: m } = await supabase\n          .from("agency_member")\n          .select("agency_id")\n          .eq("user_id", user.id)\n          .limit(1);\n\n        if (m && m.length > 0) return; // OK, Agency-Dashboard anzeigen\n\n        // Fallback: Profil-Typ (oder Meta)\n        const { data: profile } = await supabase\n          .from("user_profile")\n          .select("account_type")\n          .eq("user_id", user.id)\n          .maybeSingle();\n\n        const type = String(profile?.account_type || user.user_metadata?.account_type || "").toLowerCase();\n        if (type !== "agency") {\n          location.href = "/dashboard-model"; // falscher Typ -> rüber ins Model-Dashboard\n        }\n      }\n\n      guardAgencyOnly();\n\n      // Logout\n      window.addEventListener("DOMContentLoaded", () => {\n        document.getElementById("logoutBtn")?.addEventListener("click", async () => {\n          await supabase.auth.signOut();\n          location.href = "/";\n        });\n      });\n    </script>', '</head> <body class="bg-luxblack text-white font-sans min-h-screen"> <header class="bg-black border-b border-luxgray p-4 flex justify-between items-center flex-wrap"> <h1 class="text-xl font-serif text-luxgold">LUXBASE – Agenturübersicht</h1> <nav class="flex flex-wrap gap-4 text-sm font-semibold"> <a href="/dashboard" class="hover:text-luxgold">Creator-Übersicht</a> <a href="/dashboard-agentur" class="text-luxgold underline">Agentur-Dashboard</a> <a href="/preise" class="hover:text-luxgold">Pakete & Preise</a> </nav> <div class="flex items-center gap-3 mt-4 md:mt-0"> <button id="logoutBtn" class="border border-luxgold text-luxgold px-3 py-1 rounded hover:bg-luxgold hover:text-black transition">Abmelden</button> </div> </header> <main class="p-6"> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- hier deine Agentur-Kacheln/Komponenten --> </div> </main> </body></html>'])), renderHead());
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-agentur.astro", void 0);
const $$file = "C:/Users/Anwender/Downloads/luxbase-starter/src/pages/dashboard-agentur.astro";
const $$url = "/dashboard-agentur";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DashboardAgentur,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
