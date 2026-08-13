/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campfire: {
          50: '#fff8f1',
          100: '#feeedc',
          200: '#fcd8b4',
          300: '#faba82',
          400: '#f7934c',
          500: '#f37121',
          600: '#e45314',
          700: '#bd3d12',
          800: '#963216',
          900: '#792b16',
          950: '#411309',
        },
        forest: {
          800: '#14251d',
          900: '#0d1813',
          950: '#070e0a',
        },
        charcoal: {
          800: '#1c1e22',
          850: '#15171a',
          900: '#101214',
          950: '#0a0b0d',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Pretendard"', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(243, 113, 33, 0.4)',
        'ios': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
