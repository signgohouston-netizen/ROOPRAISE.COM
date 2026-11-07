import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep teal
        brand: {
          50: "#eafaf6",
          100: "#cbf0e7",
          200: "#98e0d1",
          300: "#5cc9b4",
          400: "#26a98f",
          500: "#0e7c6b", // primary
          600: "#0b6558",
          700: "#0c5049",
          800: "#0d403b",
          900: "#0d3531",
        },
        // Warm accent — gold (matches the logo's golden center)
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f5b301", // accent
          600: "#d99a00",
          700: "#b37d00",
          800: "#8f6400",
          900: "#6b4b00",
        },
        cream: "#fbf8f3",
        ink: "#17211f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(43,35,32,0.08), 0 8px 24px rgba(43,35,32,0.06)",
        pop: "0 12px 40px rgba(43,35,32,0.16)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
