/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          600: '#1a1a3e',
          700: '#0f0f2e',
          800: '#0a0a1f',
        },
        'primary': {
          600: '#3d3fff',
          800: '#2d2dcc',
        },
        'accent': {
          pink: '#ff006e',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a1f 0%, #0f0f2e 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3d3fff 0%, #5b6cff 100%)',
      },
      boxShadow: {
        'glow-lg': '0 0 40px rgba(123, 44, 191, 0.6)',
      },
    },
  },
  plugins: [],
}