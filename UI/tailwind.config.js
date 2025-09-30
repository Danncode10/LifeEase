/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: '#add8e6',
        'primary-dark': '#87ceeb',
        'primary-light': '#8caccaff',
        secondary: '#b0e0e6',
        accent: '#98d8e8',
        school: '#fffbeb',
        health: '#fee2e2',
        darkblue: '#1e3a8a',
      },
    },
  },
  plugins: [],
};
