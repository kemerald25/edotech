import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
    "./public/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05030a",
        foreground: "#f4f4f6",
        primary: {
          DEFAULT: "#6c24c9",
          dark: "#4b0c95",
          light: "#a17bff",
        },
        secondary: {
          DEFAULT: "#f0b12e",
          dark: "#c98a08",
          light: "#ffd580",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5f5",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(108, 36, 201, 0.45)",
        glass: "0 20px 45px rgba(5, 3, 10, 0.65)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(108, 36, 201, 0.9), rgba(240, 177, 46, 0.8))",
        "card-gradient":
          "linear-gradient(145deg, rgba(108, 36, 201, 0.9), rgba(240, 177, 46, 0.5))",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(18px)" },
          "50%": { opacity: "1", filter: "blur(24px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "logo-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "logo-marquee": "logo-marquee 25s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

