module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends:  [
      'eslint:recommended',
      'plugin:prettier/recommended',
  ],
  parserOptions:  {
      ecmaVersion:  2018,
      sourceType:  'module',
  },
  rules:  {
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
      'comma-dangle': ['error', 'never'],
      'max-lines': ['error', 500],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-param-reassign': ['error', { props: false }],
      'prefer-destructuring': ['error', { object: true, array: false }],
  }
};
