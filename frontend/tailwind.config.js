/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "468px",
      md: "830px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    }
  },
  plugins: [],
}

