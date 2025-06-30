import { defineConfig } from 'astro/config';
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  integrations: [tailwind()],
  vite: {
  plugins: [tailwind()],
},
});
