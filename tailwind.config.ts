import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New theme colors inspired by the design
        cream: {
          50: "#FDFCFB",
          100: "#F9F7F4",
          200: "#F5F3EF",
          300: "#EFEEE9",
          400: "#E8E6E0",
          500: "#DDD9D1",
          600: "#C5C0B8",
          700: "#A8A39A",
          800: "#7A7670",
          900: "#4D4A46",
        },
        sage: {
          50: "#F4F6F5",
          100: "#E8EDEB",
          200: "#D1DBD7",
          300: "#B0C3BC",
          400: "#8FAB9F",
          500: "#6E9382",
          600: "#5A7A6B",
          700: "#476156",
          800: "#354841",
          900: "#232F2C",
        },
        sand: {
          50: "#FAF9F7",
          100: "#F3F1ED",
          200: "#E7E3DB",
          300: "#D9D3C7",
          400: "#CBC3B3",
          500: "#BDB39F",
          600: "#9E9583",
          700: "#7F7767",
          800: "#5F594B",
          900: "#403B2F",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
