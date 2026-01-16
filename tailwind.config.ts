import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "1.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "600",
    },
    extend: {
      gap: {
        3: "var(--gap-sm)",
        4: "var(--gap)",
        6: "var(--gap)",
        8: "calc(var(--gap) * 1.25)",
        12: "calc(var(--gap) * 1.5)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        playfair: ["var(--font-heading)"],
        inter: ["var(--font-body)"],
        serif: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      },
      fontSize: {
        "h1": ["var(--h1)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "h1-mobile": ["var(--h1)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "h2": ["var(--h2)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "h2-mobile": ["var(--h2)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "h3": ["var(--h3)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "h3-mobile": ["var(--h3)", { lineHeight: "var(--lh-heading)", letterSpacing: "var(--ls-heading)" }],
        "body": ["var(--text-body)", { lineHeight: "var(--lh-body)", letterSpacing: "var(--ls-body)" }],
        "body-mobile": ["var(--text-body)", { lineHeight: "var(--lh-body)", letterSpacing: "var(--ls-body)" }],
        "small": ["var(--text-small)", { lineHeight: "var(--lh-body)", letterSpacing: "var(--ls-body)" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
