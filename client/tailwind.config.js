/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [forms, typography, animate],
};
