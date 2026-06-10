import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: "#FF6B00", dark: "#E25F00" },
        ink: { DEFAULT: "#1F2937", 900: "#0F1620", 700: "#374151" },
        accent: "#2563EB",
        surface: { DEFAULT: "#FFFFFF", muted: "#F4F5F7", 200: "#EAECEF" },
        line: "#E1E4E8",
        muted: "#6B7280"
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      boxShadow: { card: "0 10px 40px -12px rgba(31,41,55,.18)" },
      maxWidth: { wrap: "1240px" }
    }
  },
  plugins: []
};
export default config;
