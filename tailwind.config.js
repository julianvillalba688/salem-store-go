/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salem: {
          black: '#10141B',
          'black-soft': '#181C24',
          gold: '#B99A55',
          'gold-light': '#D7C18A',
          cream: '#F8F4EA',
          ivory: '#FFFDF7',
          beige: '#E8DDC8',
          nude: '#D9BFA3',
          muted: '#6F6A61',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(16, 20, 27, 0.08)',
        'gold-glow': '0 4px 30px -5px rgba(185, 154, 85, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
