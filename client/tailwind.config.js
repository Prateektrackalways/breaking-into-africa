/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1a4a2e',
          dark: '#0d2e1c',
          light: '#2d6b45',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c47a',
          dark: '#a88630',
        },
        cream: '#faf8f3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
