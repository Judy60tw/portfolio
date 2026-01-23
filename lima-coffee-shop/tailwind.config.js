/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf8f6',
          100: '#f3f0eb',
          200: '#e6ddd3',
          300: '#d4c4b3',
          400: '#bea68f',
          500: '#a6896e',
          600: '#8f7158',
          700: '#765c4a',
          800: '#624d3f',
          900: '#524135',
          950: '#2a1f19',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
