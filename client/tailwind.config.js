module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': '#ffffff',
        'secondary-light': '#f3f4f6',
        'text-light': '#111827',
        'accent-light': '#3b82f6',
        
        'primary-dark': '#1f2937',
        'secondary-dark': '#111827',
        'text-dark': '#f9fafb',
        'accent-dark': '#60a5fa',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}