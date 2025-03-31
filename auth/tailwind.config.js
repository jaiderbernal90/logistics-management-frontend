const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)",
          light: "var(--color-secondary-light)",
        },
        neutral: {
          lightest: "var(--color-neutral-lightest)",
          light: "var(--color-neutral-light)",
          medium: "var(--color-neutral-medium)",
          dark: "var(--color-neutral-dark)",
          darkest: "var(--color-neutral-darkest)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
