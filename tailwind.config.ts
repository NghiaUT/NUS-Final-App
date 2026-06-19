/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'ios-fade': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        'ios-fade': 'ios-fade 1.2s linear infinite',
      }
    },
  },
  plugins: [],
}