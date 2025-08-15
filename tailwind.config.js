// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         // pl. alapértelmezett font a 'Inter', ha nincs, akkor sans-serif
//         sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
//       },
//     },
//   },
//   content: [
//     "./src/**/*.{html,ts}",
//   ],
//   plugins: [],
// };

module.exports = {
  darkMode: 'class',
  content: ['./**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#e11d48', // élénk piros akcent (alfa-szerű)
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        ink: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 6px 20px -8px rgb(0 0 0 / 0.15)',
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
