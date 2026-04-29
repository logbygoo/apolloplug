/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'zen-dots': ['"Zen Dots"', 'sans-serif'],
      },
      colors: {
        border: 'hsl(0 0% 90%)',
        input: 'hsl(0 0% 85%)',
        ring: 'hsl(0 0% 50%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 10%)',
        primary: {
          DEFAULT: 'hsl(0 0% 10%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 95%)',
          foreground: 'hsl(0 0% 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 90%)',
          foreground: 'hsl(0 0% 45%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 95%)',
          foreground: 'hsl(0 0% 10%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 10%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 10%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ring: 'ring 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        ring: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '10%': { transform: 'rotate(-15deg) scale(1.1)' },
          '20%': { transform: 'rotate(15deg) scale(1.1)' },
          '30%': { transform: 'rotate(-15deg) scale(1.1)' },
          '40%': { transform: 'rotate(15deg) scale(1.1)' },
          '50%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
      textShadow: {
        DEFAULT: '0 1px 3px rgb(0 0 0 / 0.4)',
        md: '0 2px 5px rgb(0 0 0 / 0.5)',
        lg: '0 4px 10px rgb(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [
    ({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    },
  ],
};
