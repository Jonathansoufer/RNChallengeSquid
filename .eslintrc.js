module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  globals: {
    __DEV__: 'readonly',
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/internal-regex': '^@/',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['FlatList'],
            message:
              'Use FlashList from @shopify/flash-list instead, same API, but more performant',
          },
          {
            name: '@gorhom/bottom-sheet',
            importNames: ['BottomSheetFlatList'],
            message:
              'Use BottomSheetFlashList from src/components/BottomSheet/BottomSheetFlashList.tsx instead, same API, but more performant',
          },
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: true,
        bracketSpacing: true,
        arrowParens: 'always',
      },
      { usePrettierrc: false },
    ],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'no-empty-pattern': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/no-children-prop': 0,
    'react/jsx-curly-brace-presence': [
      2,
      { props: 'never', children: 'never' },
    ],
    'react-native/no-inline-styles': 2,
    'react-native/sort-styles': 1,
    'react-hooks/rules-of-hooks': 2,
    'no-empty': 0,
    'no-extra-boolean-cast': 0,
    'prefer-const': 0,
    'import/default': 0,
    'import/export': 0,
    'import/no-cycle': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-color-literals': 0,
    'react/jsx-key': 1,
    'react-native/split-platform-components': 0,
    'react/no-array-index-key': 1,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['index', 'sibling'],
          'parent',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
