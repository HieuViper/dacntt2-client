/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Knewave: ["Knewave"],
      },
      colors: {
        "dark-800": "#1F1D2B",
        "dark-700": "#2D303E",
        "primary-500": "#EE8C87",
        "primary-600": "#EA736D",
      },
    },
  },
  plugins: [],
};
