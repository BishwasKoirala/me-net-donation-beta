import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "!./app/pdf-beta/**/*.{js,ts,jsx,tsx,mdx}",  // Exclusion pattern
  ],
  theme: {
    extend: {
      colors: {
        brand: "#3b5998",
        "brand-secondary": "#ffa34d",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    // require("daisyui")
  ],
};

export default config;
