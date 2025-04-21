import pkg from '@typescript-eslint/eslint-plugin';
const { ESLint: TS_ESLint } = pkg;

export default [
  'eslint:recommended', // Az alap ESLint ajánlások
  '@typescript-eslint/recommended', // A TypeScript ajánlások
  {
    files: ['src/**/*.ts'], // Csak a forrás fájlokat lintelje
    ignores: ['dist/**/*', 'node_modules/**/*'], // Kizárva a buildelt fájlok
    parserOptions: {
      project: true, // A tsconfig.json fájl betöltése
      tsconfigRootDir: process.cwd(),
    },
    rules: {
      semi: ['error', 'always'], // Példa szabály: pontosvesszők kérése
      quotes: ['error', 'single'], // Egysoros idézőjelek
    },
  },
];
