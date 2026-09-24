/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      colors: {
        // هوية دار السنة — بني + كريمي (ورق قديم فاخر) — UI-UX.md، مؤكَّد
        brand: {
          DEFAULT: '#6B4226',
          dark: '#3F2714',
          cream: '#F3E8D3',
        },
      },
    },
  },
  plugins: [],
};
