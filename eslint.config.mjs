import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import neostandard from 'neostandard';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const neostandardConfig = neostandard({ semi: true, noStyle: true });

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/build', '**/dist', '**/.docz', '**/.github', '**/node_modules'],
  },
  ...neostandardConfig,
  ...compat.extends('plugin:react/recommended', 'prettier', 'plugin:prettier/recommended'),
  {
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
      jest,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...jest.environments.globals.globals,
      },

      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: '18',
      },
    },

    rules: {
      'no-constant-binary-expression': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      semi: [2, 'always'],

      'max-len': [
        'error',
        {
          code: 120,
        },
      ],
    },
  },
];
