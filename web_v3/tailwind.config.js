/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa: "#e4007c",
        fresh: "#50e3c2 ",
      },
    },
    fontFamily: {
      sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
  extend: {
    animation: {
      text: "text 5s ease infinite",
    },
    keyframes: {
      text: {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
    },
  },
};
