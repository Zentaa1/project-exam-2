/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#292F36',
        'secondary': '#F7FFF7',
        'customOrange': '#FF9770',
        'secondaryOrange': '#FF971',
        'customGray' : '#7C898B',
        'inputBg' : '#E8ECE8'
      },
      fontFamily: {
        'sans': ['"PT Sans"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif'],
        'sourceSans': ['"Source Sans Pro"', 'sans-serif'],
      },
      screens: {
        xs: "480px",
        sm: "660px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
}
