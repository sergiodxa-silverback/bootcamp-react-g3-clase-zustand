import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'Montserrat', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
