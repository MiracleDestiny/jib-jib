import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          yellow: "#FFDB15",
          gray: "#8899A6",
          black: "#0F1419",
          lightgray: "#D5D6D6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
