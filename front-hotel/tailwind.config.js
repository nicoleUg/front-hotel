/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unos colores elegantes por defecto (puedes cambiarlos luego)
        hotel: {
          50: '#f8fafc',
          800: '#1e293b',
          900: '#0f172a',
          accent: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}