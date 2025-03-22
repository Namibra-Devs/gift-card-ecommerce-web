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
        linkcolor: "#5555CB",
        white: "#FFFFFF",
        grey: "#707070",
        greynormal: "#0D0D0E",
        greydark: "#0A0A0B",
        greylight: "#F7F7F7",
        greynegative: "#BFBFBF",
        greylightactive: "#B4B4B4",
        overlay: "rgba(0, 0, 0, 0.1)",
        greenlightactive: "#F7EFD3",
        bluelightactive: "#CED7F8",
        rednormal: "#D94545",
        redlightactive: "#FFB0B1",
        boltbg: "#EEEEEE",
        walmartbg: "#1A75CF",
        doordashbg: "#CD4C59",
        amazonbg: "#232F3E",
        playstationbg: "#01479C",
        nintendobg: "#E60012",
        ninetendobggrey: "#F1F1F1",
        starbucksbg: "#016438",
        spotifybg: "#1DB954",
        netflixbg: "#E50914",
        xboxbg: "#107C10",
        hotelsbg: "#FBD7DB"
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