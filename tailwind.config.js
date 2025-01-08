/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        black: '#1A1A1A',
        blackLight: "rgba(26, 26, 26, 0.5)",
        yellow: "#FFF3AE",
        yellowLight: "rgba(255, 243, 174, 0.5)",
        red: "#D62144",
        blue: "#C9F9FB",
        blueLight: "rgba(201, 249, 251, 0.5)"
      },
      boxShadow: {
        "yellow": "0px -1px 15px 0px rgba(255,243,174,1)",
        "blue": "0px -1px 15px 0px rgba(201, 249, 251, 1)"
      },
      spacing: {
        "full-4": "calc(100% + 4px)",
        "full-64": "calc(100% + 64px)",
      },
      minHeight: {
        "full-144": "calc(100vh - 144px)",
      }
    },
  },
  plugins: [],
}

