/** @type {import('tailwindcss').Config} */
export default {
  content: [  
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
       gray:{
           300:"#61677A"
       },
      },
    },
  },
  plugins: [],
}

