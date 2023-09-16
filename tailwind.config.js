const fallbackFont = [
  "-apple-system",
  "BlinkMacSystemFont",
  `"Segoe UI"`,
  "Roboto",
  "Oxygen",
  "Cantarell",
  `"Open Sans"`,
  `"Helvetica Neue"`,
  "sans-serif",
];

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "320px",
      sm: "576px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1880px",
    },
    extend: {
      colors: {
        marine: "hsl(213, 96%, 18%)",
        purplish: "hsl(243, 100%, 62%)",
        pastelBlue: "hsl(228, 100%, 84%)",
        lightBlue: "hsl(206, 94%, 87%)",
        strawberry: "hsl(354, 84%, 57%)",
        coolGray: "hsl(231, 11%, 63%)",
        lightGray: "hsl(229, 24%, 87%)",
        radioGray: "hsla(229, 24%, 87%, .25)",
        magnolia: "hsl(217, 100%, 97%)",
        alabaster: "hsl(231, 100%, 99%)",
        marine_hover: "hsl(213, 70%, 32%)",
      },
      fontFamily: {
        regular: [`"Ubuntu Regular"`, ...fallbackFont],
        medium: [`"Ubuntu Medium"`, ...fallbackFont],
        bold: [`"Ubuntu Bold"`, ...fallbackFont],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/aspect-ratio")],
};
