/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#212529",
        "hot-pink": "#ff269e",
      },
    },
  },
  plugins: [],
};
