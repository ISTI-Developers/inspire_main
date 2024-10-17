/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    colors: {
      red: "#DF0000",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
