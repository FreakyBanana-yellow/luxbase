import { c as createComponent, m as maybeRenderHead, b as addAttribute, r as renderTemplate, a as createAstro, e as renderHead, d as renderComponent, f as renderSlot } from './astro/server_BM0YAzyH.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$AdminSidebar = createComponent(($$result, $$props, $$slots) => {
  const items = [
    { href: "/admin", label: "\xDCbersicht" },
    { href: "/admin/pakete", label: "Pakete & Funktionen" },
    { href: "/admin/mail", label: "Direktnachrichten" },
    { href: "/admin/aktivit\xE4t", label: "Letzte Aktivit\xE4t" },
    { href: "/admin/notizen", label: "Notizen" },
    { href: "/admin/botlinks", label: "Bot-Zug\xE4nge" },
    { href: "/admin/einstellungen", label: "Einstellungen" },
    { href: "/admin/stats", label: "Stats & Insights" }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="w-64 bg-black/60 border-r border-luxgray h-[calc(100vh-64px)] p-4 hidden md:block"> <nav class="space-y-1"> ${items.map((it) => renderTemplate`<a${addAttribute(it.href, "href")} class="block px-3 py-2 rounded hover:bg-luxgray/30 text-sm">${it.label}</a>`)} </nav> </aside>`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/components/AdminSidebar.astro", void 0);

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Luxbase Admin" } = Astro2.props;
  return renderTemplate`<html lang="de"> <head><title>${title}</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#0d0d0d"><meta id="supabase-config"${addAttribute("https://zpzigwfjfhogkzuvijzm.supabase.co", "data-url")}${addAttribute("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwemlnd2ZqZmhvZ2t6dXZpanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjcwNDcsImV4cCI6MjA2NjUwMzA0N30.jMDAFkPhKmLXtLYerLd9z93tugNvw14L4oZvSNkSD2o", "data-key")}>${renderHead()}</head> <body class="bg-luxblack text-white font-sans"> <header class="w-full flex justify-between items-center p-4 bg-black border-b border-luxgray sticky top-0 z-50"> <a href="/admin" class="text-luxgold font-serif text-xl">LUXBASE</a> <span class="text-sm text-luxgold/60">🔐 Adminbereich</span> </header> <div class="flex min-h-screen"> <div class="hidden md:block"> ${renderComponent($$result, "AdminSidebar", $$AdminSidebar, {})} </div> <main class="flex-1 p-4 md:p-6 pb-24"> ${renderSlot($$result, $$slots["default"])} </main> </div> </body></html>`;
}, "C:/Users/Anwender/Downloads/luxbase-starter/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
