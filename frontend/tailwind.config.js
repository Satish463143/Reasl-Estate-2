/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite/plugin');
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

module.exports = {
  content: [
    './index.html',
    './src/**/*.{jsx,js,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', 
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite, flowbiteReact],
};
