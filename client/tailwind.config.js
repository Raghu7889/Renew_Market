/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f4740b",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
