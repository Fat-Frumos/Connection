module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:import/errors'],
  ignorePatterns: ['karma.conf.js'],
  rules: {
    // '@typescript-eslint/object-curly-spacing': ['error', 'never'],
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    '@typescript-eslint/comma-dangle': 'off',
  },
};
