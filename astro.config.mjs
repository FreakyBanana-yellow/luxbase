// astro.config.mjs
import { defineConfig } from 'astro/config'
import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
  // Hybrid = statische Seiten + Server nur dort, wo nötig (z. B. /api/*)
  output: 'hybrid',
  adapter: netlify(), // erzeugt Netlify Functions/Edge für SSR & API
  integrations: [react(), tailwind()],

  // In der Regel NICHT nötig, React/React-DOM NICHT externalisieren.
  // Entferne dein bisheriges vite.ssr.external, das hat dein SSR gekillt.
  vite: {
    ssr: {
      // leer lassen oder weglassen
    }
  }
}