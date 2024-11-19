/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan React components
    "./node_modules/mamba-ui/**/*.{js,jsx,ts,tsx}", // Add Mamba UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
