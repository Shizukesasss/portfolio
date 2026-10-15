/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#15130F',
        raised: '#1F1C16',
        line: '#38332A',
        bone: '#EDE8DB',
        smoke: '#A8A190',
        stone: '#5A5446',
        amber: '#E58E26',
        accent: '#E58E26',
        highlight: '#E58E26',
        primary: '#E58E26',
        ice: '#8DB8D6',
      },
      fontFamily: {
        sans: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
