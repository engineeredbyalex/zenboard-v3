/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'doger-blue': '#2191FB',
        'gun-metal': '#292F36',
        'dark-gray': '#222222',
        'light-gray': '#606060',
        'anti-flash-white': '#EEEEEE',
        'emerald': '#23CE6B',
        'folly': '#FF3864',
      }
    },
  },
  plugins: [],
};
