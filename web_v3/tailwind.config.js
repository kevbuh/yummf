/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa: "#FF385C",
        rosalight: "#f76a84",
        fresh: "#50e3c2 ",
        freshdark: "#4edebd",
        "smoke-light": "rgba(0, 0, 0, 0.4)",
      },
    },
    fontFamily: {
      sans: [
        "Cereal",
        "Cereal_light",
        "Segoe UI",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
      ],
      serif: [
        "Cereal",
        // "Cereal_light",
        "Segoe UI",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
      ],
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
