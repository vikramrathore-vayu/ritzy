/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#010828',
          light: '#05113d',
          dark: '#000414',
        },
        cream: {
          DEFAULT: '#EFF4FF',
          muted: '#A5B4FC',
        },
        neon: {
          DEFAULT: '#6FFF00',
          dark: '#58cc00',
        }
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        condiment: ['Condiment', 'cursive'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
