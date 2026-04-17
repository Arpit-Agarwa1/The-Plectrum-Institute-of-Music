/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E6",
        sand: "#E8DCCB",
        brown: "#8B5E3C",
        "brown-dark": "#5C3A21",
        ink: "#2B1A12",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(43, 26, 18, 0.15)",
        card: "0 4px 24px -4px rgba(43, 26, 18, 0.12), 0 0 1px rgba(43, 26, 18, 0.08)",
        nav: "0 1px 0 rgba(43, 26, 18, 0.06)",
        header:
          "0 4px 24px -8px rgba(43, 26, 18, 0.08), 0 0 1px rgba(43, 26, 18, 0.04)",
      },
      letterSpacing: {
        "display-tight": "-0.02em",
        eyebrow: "0.22em",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
