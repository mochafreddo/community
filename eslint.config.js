// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      // Build directories
      'dist/*',
      'build/*',
      'web-build/*',

      // Expo specific (not covered by default dot-file ignoring)
      'expo-env.d.ts',

      // Package manager files
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',

      // Environment files
      '.env',
      '.env.*',

      // Logs
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // IDE/Editor temporary files (some are not dot-files)
      '*.swp',
      '*.swo',

      // OS files (some are not dot-files)
      'Thumbs.db',

      // Temporary files
      'tmp/*',
      'temp/*',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
]);
