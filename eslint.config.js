// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      // Import 순서 정렬
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'unknown',
            'internal',
            ['parent', 'sibling'],
            'index',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'expo-*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@expo/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@react-navigation/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: [
      'dist/*',
      '.expo/*',
      'expo-env.d.ts',
      'web-build/*',
      '.expo-shared/*',
      'ios/build/*',
      'android/build/*',
      'android/app/build/*',
      'node_modules/*',
    ],
  },
]);
