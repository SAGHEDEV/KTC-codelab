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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "glass-light": "rgba(255, 255, 255, 0.8)",
        "glass-dark": "rgba(0, 0, 0, 0.05)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-70": "rgba(255, 255, 255, 0.7)",
        "black-50": "rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
      },
      backdropFilter: {
        "blur-10": "blur(10px)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        "glass-lg": "0 12px 40px 0 rgba(31, 38, 135, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
