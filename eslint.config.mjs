import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      "node_modules/",
      "plugins/**/*.js",
      "src/_data/**/*.js",
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 13,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {}
  },
];
