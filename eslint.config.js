// eslint.config.js
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      'prettier/prettier': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    // HTML fájlokhoz akkor használd a @angular-eslint/template plugint, ha működik flat config-gal,
    // de jelenleg lehet, hogy még nem támogatott stabilan, ezért kihagyható vagy külön kell konfigurálni
  },
];
