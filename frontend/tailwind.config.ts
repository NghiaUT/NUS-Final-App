/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm' : '480px',
        'md' : '768px'
      },
      keyframes: {
        'ios-fade': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        'ios-fade': 'ios-fade 1.2s linear infinite',
      },
      colors: {
        graywhite: '#F8F8F8',
        blue: '#3C5A9A',
        gray: '#848585',
        orange: '#D67C49'
      }
    },
  },
  plugins: [],
}