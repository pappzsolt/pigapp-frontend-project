// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}', // FONTOS! Angular sablonok
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // vagy más font
      },
    },
  },
  plugins: [],
};
