/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  safelist: [
    // Falls Utilities nur in @apply vorkommen, gehen sie sonst evtl. verloren:
    'bg-luxblack', 'text-white', 'shadow-lux'
  ],
  theme: {
    extend: {
      colors: {
        luxblack: '#0d0d0d',    // Haupt-Background
        luxgold:  '#ffd700',    // Akzent-Gold
        luxgray:  '#1a1a1a',    // Karten-Hintergrund
      },
      fontFamily: {
        sans:  ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        lux: '0 0 25px 0 rgba(255,215,0,0.05)',
      },
    },
  },
  plugins: [],
};
