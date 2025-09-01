# Luxbase Patch Bundle

Dieses Bundle enthält:
- `src/lib/supabaseServer.ts` – Server-Client mit Cookie-Adapter (.value-Fix)
- `src/lib/supabase.ts` – Browser-Client, SSR-sicher (kein `document` auf Server)
- `src/lib/profileServer.ts` – Profil inkl. `rolle`
- `src/lib/auth/roles.ts` – Rollen-Helper
- `src/lib/routerAfterLogin.ts` – Routing nach Login (admin/agentur/creator)
- `src/middleware.ts` – Auth-Guard ("/dashboard/model" immer erlaubt)
- `scripts/apply-prerender-flag.js` – setzt `export const prerender = false;` in wichtigen Seiten
- `scripts/find-localhost.ps1` – findet harte localhost-Links

## Installation
1. Zip entpacken **über** dein Projekt (Struktur beibehalten).
2. Prerender-Flag setzen (im Projektverzeichnis):
   ```bash
   node scripts/apply-prerender-flag.js
   ```
3. Stelle sicher, dass React-Komponenten, die den Browser-Client nutzen, clientseitig hydratisiert werden, z. B.:
   ```astro
   <ProfileForm client:load />
   ```
4. Supabase → Authentication → URL configuration → **Site URL** auf deine Live-Domain.
5. Im Login-Code `redirectTo: window.location.origin` setzen.
6. Optional: harte localhost-Links suchen
   ```powershell
   ./scripts/find-localhost.ps1
   ```
7. Deploy.
