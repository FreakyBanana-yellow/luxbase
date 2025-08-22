/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        luxblack: '#0d0d0d',
        luxgold:  '#ffd700',
        luxgray:  '#1a1a1a',
      },
      fontFamily: {
        sans:  ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: { lux: '0 0 25px 0 rgba(255,215,0,0.05)' },
    },
  },
  plugins: [],
};
