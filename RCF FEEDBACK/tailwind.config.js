/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rcf-orange': '#f47e1b',
        'rcf-blue': '#35a3fc',
      },
    },
  },
  plugins: [],
}
