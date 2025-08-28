// astro.config.mjs
import { defineConfig } from 'astro/config'
import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
  output: 'hybrid',      // statische Seiten + Server nur da, wo nötig (/api/*)
  adapter: netlify(),    // Netlify Functions/SSR
  integrations: [react(), tailwind()],
})
