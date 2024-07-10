import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'windows'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-case-declarations': 0,
    },
  },
];
