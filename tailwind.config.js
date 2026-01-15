/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EE6D08',         // Orange
        secondary: '#016E98',       // Bleu
        'green-dark': '#317812',    // Vert foncé
        'green-lime': '#8AB00D',    // Vert lime
        'neutral-light': '#F0F0F0', // Gris clair
        dark: '#001a4d',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

