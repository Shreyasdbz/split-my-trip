/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth: {
      modalSmall: "18rem",
      modalMedium: "24rem",
      modalLarge: "36rem",
    },
    extend: {},
  },
  plugins: [],
};
