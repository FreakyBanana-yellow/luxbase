// astro.config.mjs
import { defineConfig } from 'astro/config'
import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import { fileURLToPath } from 'url'

export default defineConfig({
  output: 'hybrid',
  adapter: netlify(),
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})