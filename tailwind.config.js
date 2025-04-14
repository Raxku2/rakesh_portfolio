/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backdropBlur: {
        '10': '10px',
        '30': '30px',
        '50': '50px',
      }, animation: {
        spin360: 'spin360 10s linear infinite',
      }, keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'),
    require('@tailwindcss/aspect-ratio')
  ],
}

