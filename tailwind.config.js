// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // pl. alapértelmezett font a 'Inter', ha nincs, akkor sans-serif
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [],
};




