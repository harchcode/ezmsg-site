const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mali', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: { borderColor: ['focus-within'] },
  plugins: []
};
