import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'iranyekan': ['iranyekan', 'sans-serif'],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold:'700'
      },
    },
  },
  plugins: [],
} satisfies Config;
