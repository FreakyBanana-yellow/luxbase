/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderTemplate, e as renderHead } from '../chunks/astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$DashboardAgentur = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardAgentur;
  const supabaseUrl = "https://zpzigwfjfhogkzuvijzm.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwemlnd2ZqZmhvZ2t6dXZpanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjcwNDcsImV4cCI6MjA2NjUwMzA0N30.jMDAFkPhKmLXtLYerLd9z93tugNvw14L4oZvSNkSD2o";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/");
  }
  return renderTemplate(_a || (_a = __template(['---\n<head><title>Luxbase – Agentur-Dashboard</title><script type="module">\n      // Supabase-Client im Browser initialisieren\n      import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";\n      window.supabase = createClient(\n        import.meta.env.PUBLIC_SUPABASE_URL,\n        import.meta.env.PUBLIC_SUPABASE_ANON_KEY\n      );\n    </script>', '</head> <body class="bg-luxblack text-white font-sans min-h-screen"> <header class="bg-black border-b border-luxgray p-4 flex justify-between items-center flex-wrap"> <h1 class="text-xl font-serif text-luxgold">LUXBASE – Agenturübersicht</h1> <nav class="flex flex-wrap gap-4 text-sm font-semibold"> <a href="/dashboard" class="hover:text-luxgold">Creator-Übersicht</a> <a href="/dashboard-agentur" class="text-luxgold underline">Agentur-Dashboard</a> <a href="/preise" class="hover:text-luxgold">Pakete & Preise</a> </nav> <div class="flex items-center gap-3 mt-4 md:mt-0"> <button id="logoutBtn" class="border border-luxgold text-luxgold px-3 py-1 rounded hover:bg-luxgold hover:text-black transition">Abmelden</button> </div> </header> <main class="p-6"> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> <!-- Agentur-Kacheln wie gehabt --> <!-- ... (aus Platzgründen hier nicht nochmal eingefügt) --> </div> </main> <script type="module">\n      document.getElementById("logoutBtn")?.addEventListener("click", async () => {\n        const { error } = await window.supabase.auth.signOut();\n        if (!error) location.href = "/";\n        else alert("Fehler beim Abmelden");\n      });\n    </script> </body> '])), renderHead());
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
