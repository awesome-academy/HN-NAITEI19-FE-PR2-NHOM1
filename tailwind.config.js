/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        content: 'calc(100vh - 4rem)',
      },
      minHeight: {
        content: 'calc(100vh - 5.5rem)',
      },
    },
  },
  plugins: [],
};
