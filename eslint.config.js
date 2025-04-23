import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // import 순서 그룹화
        'newlines-between': 'always', // 그룹 사이 줄바꿈
        alphabetize: { order: 'asc' }, // 알파벳 순서로 정렬
      },
    ],
    'import/no-unresolved': 'error', // 잘못된 import 경로 방지
    'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 사용 경고
    'no-debugger': 'error', // debugger 사용 방지
    'react/react-in-jsx-scope': 'off', // JSX 내 리액트 사용 확인
    'react/jsx-uses-react': 'off', // JSX 내 리액트 사용 확인
    'react/jsx-uses-vars': 'error', // JSX 내 변수/컴포넌트 사용 확인
  },
  eslintConfigPrettier,
);
