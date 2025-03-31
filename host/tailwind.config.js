export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052CC",
          dark: "#003D99",
          light: "#4C8FFF",
        },
        secondary: {
          DEFAULT: "#FF5630",
          dark: "#DE350B",
          light: "#FF8F73",
        },
        neutral: {
          lightest: "#F4F5F7",
          light: "#DFE1E6",
          medium: "#97A0AF",
          dark: "#42526E",
          darkest: "#172B4D",
        },
      },
    },
  },
  plugins: [],
};
