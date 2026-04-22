/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /** Page shell — light warm paper */
        cream: "#F5F0E6",
        /** Secondary surface / borders */
        sand: "#E8DCCB",
        /** Accent / links / CTA */
        brown: "#8B5E3C",
        /** Headings, strong emphasis */
        "brown-dark": "#5C3A21",
        /** Body text */
        ink: "#2B1A12",
        /**
         * Dark “canvas” (slightly warmer than flat ink) — use with opacity for panels
         */
        night: "#18100c",
      },
      fontFamily: {
        /** UI, nav, body — Google Fonts Poppins (see `index.html`) */
        sans: ["Poppins", "system-ui", "sans-serif"],
        /** Titles, hero, lockup name — Google Fonts Playfair Display */
        display: ["Playfair Display", "Georgia", "serif"],
      },
      /**
       * Typography tokens (use in JSX with `className` — not in `globals.css` @apply; see body rule there).
       * Body under `max-sm`: `font-size: 0.9375rem` in CSS; from `sm:` up, `text-base` (16px).
       */
      fontSize: {
        /** Section kicker / overline (11px) */
        eyebrow: ["0.6875rem", { lineHeight: "1.2" }],
        /** Sticky bar links: between `text-xs` and `text-sm` (13px) */
        "nav-bar": ["0.8125rem", { lineHeight: "1.4" }],
        /** Same size as default body on narrow viewports (15px) */
        "body-sm": ["0.9375rem", { lineHeight: "1.5" }],
        /** Home hero display line on `lg+` (56px) */
        hero: ["3.5rem", { lineHeight: "1.1" }],
        /** Institute name in footer between `text-2xl` and `text-3xl` (25.6px) */
        "title-lg": ["1.6rem", { lineHeight: "1.2" }],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(43, 26, 18, 0.15)",
        "soft-dark": "0 10px 40px -10px rgba(0, 0, 0, 0.45)",
        card: "0 4px 24px -4px rgba(43, 26, 18, 0.12), 0 0 1px rgba(43, 26, 18, 0.08)",
        "card-dark":
          "0 4px 24px -4px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05)",
        nav: "0 1px 0 rgba(43, 26, 18, 0.06)",
        "nav-dark": "0 1px 0 rgba(0, 0, 0, 0.35)",
        header:
          "0 4px 24px -8px rgba(43, 26, 18, 0.08), 0 0 1px rgba(43, 26, 18, 0.04)",
        "header-dark":
          "0 4px 24px -8px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.04)",
      },
      letterSpacing: {
        "display-tight": "-0.02em",
        eyebrow: "0.22em",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        /** Site shell / header — `duration-shell` (avoid name `theme`: breaks @apply) */
        shell: "320ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "soft-spring": "cubic-bezier(0.25, 0.9, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
