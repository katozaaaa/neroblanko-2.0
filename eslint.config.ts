import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules'
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: [ '**/*.{js,mjs,cjs,ts,mts,cts}' ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: { js },
    rules: {
      'indent': [ 'warn', 2, { 'SwitchCase': 1 } ],
      'quotes': [ 'warn', 'single', { 'avoidEscape': true } ],
      'comma-dangle': [ 'warn', 'never' ],
      'semi': [ 'warn', 'always' ],
      'object-curly-spacing': [ 'warn', 'always' ],
      'array-bracket-spacing': [ 'warn', 'always' ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
);
