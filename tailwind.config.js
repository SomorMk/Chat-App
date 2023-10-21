/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'pop': ['Poppins', 'sans-serif'],
        'sans': ['Open Sans', 'sans-serif']
      },
      colors: {
        'w': '#fff',
        'b': '#000',
        'primary': '#5F35F5',
        'sec': '#11175D',
        'po': '#595D8E',
        'so': '#7F7F7F',
        'hover': '#EA6C00',
        'b-half': 'rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}