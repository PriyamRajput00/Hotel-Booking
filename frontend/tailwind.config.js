/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        md :"10rem",           // This applies 10rem on all screen sizes
      },                
    },
    extend: {},
  },
  plugins: [],
}