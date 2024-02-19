/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"]
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          secondary: "hsl(var(--border-secondary))",
          foreground: "hsl(var(--border-foreground))",
          disabled: "hsl(var(--border-secondary))"
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        active: "hsl(var(--active))",
        disabled: "hsl(var(--disabled))",
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          secondary: "hsl(var(--success-secondary))",
          50: "hsla(144, 78%, 96%, 1)",
          100: "hsla(141, 74%, 92%, 1)",
          200: "hsla(144, 69%, 80%, 1)",
          500: "hsla(152, 77%, 39%, 1)",
          600: "hsla(153, 91%, 30%, 1)",
          700: "hsla(155, 91%, 24%, 1)"
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
          secondary: "hsl(var(--error-secondary))",
          50: "hsla(4, 88%, 97%, 1)",
          100: "hsla(4, 95%, 94%, 1)",
          200: "hsla(4, 98%, 89%, 1)",
          500: "hsla(4, 86%, 58%, 1)",
          600: "hsla(4, 74%, 49%, 1)",
          700: "hsla(4, 76%, 40%, 1)"
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          secondary: "hsl(var(--warning-secondary))",
          50: "hsla(44, 98%, 97%, 1)",
          100: "hsla(44, 98%, 89%, 1)",
          600: "hsla(28, 97%, 44%, 1)"
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
          disabled: "hsl(var(--background-disabled))"
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          disabled: "hsl(var(--foreground-disabled))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          solid: "hsl(var(--primary-solid))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          700: "hsla(217, 24%, 27%, 1)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        text: {
          DEFAULT: "hsl(var(--text))",
          foreground: "hsl(var(--text-foreground))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
          senary: "hsl(var(--text-senary))"
        }
      },
      spacing: {
        xxs: "2px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
        "6xl": "48px"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-once": "spin 0.2s linear"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
