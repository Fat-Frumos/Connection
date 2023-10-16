module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors'
  ],
  ignorePatterns: ['karma.conf.js', 'webpack.config.js', '*.html', 'projects/**/*'],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'app',
        style: 'camelCase'
      }
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'app',
        style: 'kebab-case'
      }
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'no-console': 'off',
    'no-extra-parens': ['error', 'all'],
    'array-callback-return': 'error',
    'curly': 'error',
    'default-case': 'warn',
    'eqeqeq': ['error', 'always'],
    'guard-for-in': 'warn',
    'no-caller': 'error',
    'no-empty-function': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-floating-decimal': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'warn',
    'no-return-assign': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'no-undef-init': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'max-len': ['error', {'code': 120, 'ignoreComments': true}],
    'new-cap': ['error', {'newIsCap': false, 'capIsNew': false}],
    'new-parens': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'quotes': ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-prototype-builtins': 'off',
    'no-var': 'warn',
    'no-magic-numbers': ['warn', {'ignore': [0, 1]}],
    'import/named': 'off',
    'import/no-unresolved': 'off'
  }
};
