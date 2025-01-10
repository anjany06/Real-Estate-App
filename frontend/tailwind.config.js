/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#edf1c9",
        secondary: "#8ac243",
        tertiary: "#222222",
        secondaryRed: "#f42c37",
        secondaryYellow: "#fdc62e",
        secondaryGreen: "#2dccgf",
        secondaryBlue: "#1376d4",
        secondaryWhite: "#eeeeee",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)",
      },
    },
  },
  plugins: [],
};
