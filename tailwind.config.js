/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'brand-pink': 'var(--brand-pink)',
        'brand-indigo': 'var(--brand-indigo)',
        'brand-purple': 'var(--brand-purple)',
      },
    },
  },
  plugins: [],
};