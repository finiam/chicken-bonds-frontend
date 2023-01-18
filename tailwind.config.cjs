/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        ibm: "IBM Plex Sans"
      },
      fontWeight: {
        light: 300,
        heavy: 500
      }
    }
  },
  plugins: []
};
