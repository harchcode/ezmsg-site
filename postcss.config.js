const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './pages/**/*.md',
    './templates/**/*.ejs',
    './assets/**/*.css',
    './assets/**/*.js'
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const cssnano = require('cssnano')({
  preset: 'default'
});

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    cssnano
  ],
  purgecss
};
