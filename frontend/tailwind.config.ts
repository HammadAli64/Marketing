import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00e8ff",
          hover: "#00c4db",
          soft: "rgba(0, 232, 255, 0.12)",
          muted: "rgba(0, 232, 255, 0.22)",
        },
        helix: {
          bg: "#0A1128",
          surface: "#0f1629",
          elevated: "#141d35",
          /** Light-mode headings: deep blue-slate (not near-black slate-900). */
          heading: "#1a3557",
          border: "rgba(148, 163, 184, 0.12)",
          muted: "#94a3b8",
          gold: "#D4AF37",
          /** Muted gold for section labels (e.g. staff augmentation eyebrow). */
          goldMuted: "#C5B358",
          /** Deep navy for high-contrast body on white cards. */
          deepNavy: "#001F3F",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgb(255 255 255 / 0), white), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 232, 255, 0.08), transparent)",
        "grid-fade-dark":
          "linear-gradient(to bottom, transparent, rgb(10 17 40)), radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 232, 255, 0.14), transparent)",
        "glow-radial":
          "radial-gradient(ellipse at top, rgba(0, 232, 255, 0.1), transparent 55%)",
        "glow-radial-dark":
          "radial-gradient(ellipse at top, rgba(0, 232, 255, 0.14), transparent 55%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 42s linear infinite",
        "marquee-rev": "marquee-rev 48s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
