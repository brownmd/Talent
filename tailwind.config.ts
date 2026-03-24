import type { Config } from "tailwindcss";
import { darkBackground } from "./blog.config";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        dark: darkBackground || "#1a1a1a",
        gray: {
          50: "#F0F0F0",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#656565",
          600: "#525252",
          700: "#3a3a3a",
          800: "#2a2a2a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
