/** @type {import('tailwindcss').Config} */
const sharedTheme = require('../../packages/ui/src/theme');

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: sharedTheme.colors.primary,
        // Alias teal as primary for backward compatibility
        teal: sharedTheme.colors.primary
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

