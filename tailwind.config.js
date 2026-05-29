/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: '#11151C',
          light: '#2E3035',
        },
        gold: {
          DEFAULT: '#B99A55',
          satin: '#B99A55',
          light: '#E4C279',
          dark: '#795F20',
        },
        cream: {
          DEFAULT: '#F8F4EA',
          warm: '#F8F9FF',
        },
        ivory: '#FFFDF7',
        beige: '#E8DDC8',
        nude: '#D9BFA3',
        gray: {
          editorial: '#6B6D72',
          light: '#F3F3F9',
          outline: '#C6C6CB',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 40px -8px rgba(17, 21, 28, 0.08)',
        'gold-glow': '0 4px 24px -4px rgba(185, 154, 85, 0.25)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F8F4EA 0%, #FFFDF7 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
