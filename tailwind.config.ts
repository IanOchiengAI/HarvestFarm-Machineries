import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        harvest: {
          green: '#228B22', // Forest Green
          brown: '#8B4513', // Earth Brown
          gold: '#F5DEB3',  // Wheat Gold
          blue: '#87CEEB',  // Sky Blue
          cream: '#FDFBF7',
          orange: '#FF8C00', // Deep Orange for CTA
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-1%, -1%)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 20s ease-out infinite alternate',
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
