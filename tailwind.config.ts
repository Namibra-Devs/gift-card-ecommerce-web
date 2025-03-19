import gridAutoFit from "@shrutibalasa/tailwind-grid-auto-fit";
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#F963D5",
        glass: "#434343",
        blur: "hsba(0, 0%, 100%, 0.1)"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    gridAutoFit
  ],
}
export default config