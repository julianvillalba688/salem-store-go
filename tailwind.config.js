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
          400: '#d2bab0', // Nude / Blush
          500: '#b08c7c', // Rose Gold Soft
          600: '#8c6b5d',
          700: '#6b4f44', // Dark Rose Gold
          800: '#4a362e',
          900: '#2e201b',
        },
        dark: '#2d2424', // Un marrón café muy oscuro, más elegante que el negro
        accent: '#db2777', // Rosa brillante para detalles muy específicos
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'delicate': '0 4px 20px -2px rgba(176, 140, 124, 0.15)',
      }
    },
  },
  plugins: [],
}
