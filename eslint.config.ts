import { defineConfig } from 'eslint/config'
import jseslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig([
  {
    ignores: ['dist/', 'node_modules/']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    extends: [
      jseslint.configs.recommended,
      tseslint.configs.recommended,
      eslintConfigPrettier
    ],
    rules: {
      indent: ['warn', 2, { SwitchCase: 1 }],
      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['warn', 'never'],
      'comma-dangle': ['warn', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
])
