/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#b08c7c',
          600: '#8c6b5d',
          700: '#6b4f44',
          800: '#4a362e',
          900: '#2e201b',
        },
        dark: '#1C1816',
        accent: '#db2777',
        gold: {
          DEFAULT: '#C8A96A',
          light: '#E8D5A8',
          dark: '#A6884A',
        },
        nude: '#E8B7B7',
        cream: '#FDF0E8',
        warm: '#FAF7F2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'delicate': '0 4px 20px -2px rgba(176, 140, 124, 0.15)',
        'soft': '0 2px 40px -8px rgba(28, 24, 22, 0.12)',
        'gold': '0 4px 24px -4px rgba(200, 169, 106, 0.25)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FAF7F2 0%, #FDF0E8 50%, #FAF7F2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1C1816 0%, #2e201b 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)' },
          '70%': { boxShadow: '0 0 0 12px rgba(37, 211, 102, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
