/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        "4xl": "2560px",
        lg: "1024px",
        xl: "1440px",
        m: "375px",
        l: "425px",
        s: "320px",
        t: "768px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
