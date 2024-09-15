/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: {
          1000: '#070D23'
        },
        primary: {
          1000: '#222C4F'
        }
        },
    },
  },

 
  plugins: [],
}

