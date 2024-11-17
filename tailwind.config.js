/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: "640px"
        },
        tablet: {
          min: "641px",
          max: "768px"
        },
        desktop: {
          max: "1024px"
        },
      },
    },
  },
  plugins: [],
}

