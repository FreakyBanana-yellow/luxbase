import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  output: "server",          // API-Routen serverseitig (Netlify Functions)
  adapter: netlify(),        // Netlify-Adapter aktivieren
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      // verhindert, dass 'openai' ins Server-Bundle gezogen wird
      external: ["react", "react-dom", "openai"]
    }
    // optional zusätzlich:
    // build: { rollupOptions: { external: ["openai"] } }
  }
});
