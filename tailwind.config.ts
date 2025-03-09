// tailwind.config.ts
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
        // Cores principais inspiradas na documentação do Next.js
        "nextjs-blue": "#0070f3",
        "nextjs-blue-light": "#3291ff",
        "nextjs-blue-lighter": "#d3e5ff",
        "nextjs-black": "#000000",
        "nextjs-white": "#ffffff",
        "nextjs-gray-1": "#fafafa",
        "nextjs-gray-2": "#eaeaea",
        "nextjs-gray-3": "#999999",
        "nextjs-gray-4": "#666666",
        "nextjs-gray-5": "#444444",
        // Cores de acentuação para feedback
        "nextjs-success": "#0070f3",
        "nextjs-error": "#ee0000",
        "nextjs-warning": "#f5a623",
        "nextjs-highlight": "#7928ca",
        // Cores específicas para finanças
        income: "#00a86b",
        expense: "#e63946",
        saving: "#0070f3",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "Menlo",
          "Monaco",
          "Lucida Console",
          "Liberation Mono",
          "DejaVu Sans Mono",
          "Bitstream Vera Sans Mono",
          "Courier New",
          "monospace",
        ],
      },
      boxShadow: {
        // Sombras sutis como na documentação Next.js
        "nextjs-small": "0 5px 10px rgba(0, 0, 0, 0.12)",
        "nextjs-medium": "0 8px 30px rgba(0, 0, 0, 0.12)",
        "nextjs-large": "0 30px 60px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        nextjs: "5px",
      },
    },
  },
  plugins: [],
};

export default config;
