/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: "IBM Plex Sans"
      },
      fontWeight: {
        light: 400,
        heavy: 700
      },
      colors: {
        offblack: "#242424",
        offwhite: "#fefefe"
      }
    }
  },
  plugins: []
};
