/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#F5F0EB',
        charcoal: '#2D2B2E',
        'charcoal-2': '#3A3739',
        layer: {
          foundation: '#7A8B6F',
          relational: '#C98B6B',
          cognitive: '#4A6B8A',
          physical: '#B86B5C',
          practical: '#8A7355',
          civic: '#6B7A8A',
          adaptive: '#8A6B8A',
          integration: '#6B8A7A',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Lora', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', '"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
