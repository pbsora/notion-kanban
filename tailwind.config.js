/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#1E1E1E",
        background: "#191919",
        todo: "#2F2F2F",
      },
      fontFamily: {
        ui: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
