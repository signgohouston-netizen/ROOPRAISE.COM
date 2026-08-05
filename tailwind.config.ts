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
        brand: {
          50: "#fdf3ef",
          100: "#fbe3d8",
          200: "#f6c3ae",
          300: "#ef9a79",
          400: "#e76f43",
          500: "#dd4f1f", // primary terracotta
          600: "#c53e15",
          700: "#a32f13",
          800: "#832917",
          900: "#6b2416",
        },
        cream: "#fdfbf7",
        ink: "#2b2320",
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
