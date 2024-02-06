import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        noto: ['var(--font-noto)'],
        courierPrime: ['var(--font-crPrime)'],
      },
      animation:{
        'pulse-slow': 'pulse 4s cubic-bezier(0.2, 0.4, 0.8, 0.6) infinite;',
      },
      keyframes: {
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
};
export default config;
