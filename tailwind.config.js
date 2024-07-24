/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: "transparent" },
          '50%': { backgroundColor: "theme(colors.orange.400)" },
        }
      },
      animation: {
        blink: "blink 1.2s step-start infinite",
        blinkDelay: "blink 1.2s step-start 0.6s infinite"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['dark', 'rounded']
  }
};
