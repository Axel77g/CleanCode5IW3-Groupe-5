import type { Config } from "tailwindcss";

export default {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
      "border-green-500",
    "bg-green-500",
    "bg-green-100",
    "text-green-500",
    "border-red-500",
    "bg-red-500",
    "bg-red-100",
    "text-red-500",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
