import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#12294B",
          dark: "#0B1A33",
          light: "#1E3A66",
        },
        amber: {
          DEFAULT: "#E3A008",
          light: "#F5C451",
        },
        teal: {
          DEFAULT: "#1C7293",
          light: "#3FA7C7",
        },
        brand: {
          orange: "#F5821F",
          purple: "#5B2D91",
          pink: "#C6197A",
          green: "#7AB61C",
          maroon: "#5A1E1E",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F9FC",
          dark: "#0B1A33",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(18,41,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,41,75,0.04) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(227,160,8,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(28,114,147,0.20), transparent 45%), radial-gradient(circle at 50% 100%, rgba(91,45,145,0.15), transparent 50%)",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        ripple: "ripple 0.6s linear",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(18, 41, 75, 0.12)",
        premium: "0 20px 60px -15px rgba(18, 41, 75, 0.25)",
        "glow-amber": "0 0 40px rgba(227, 160, 8, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
