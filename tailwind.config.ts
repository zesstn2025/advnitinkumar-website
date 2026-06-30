import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        w1: "#C8A878",
        w2: "#B8945C",
        w3: "#A07840",
        dark: "#0E0A05",
        dark2: "#1A1208",
        dark3: "#241A0A",
        gold: "#C9A227",
        goldlt: "#F0CC40",
        golddk: "#8A6A12",
        cream: "#FAF3E2",
        parch: "#EDE0C4",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        mono: ["var(--font-spacemono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
