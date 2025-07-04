import regularExpression from 'eslint-plugin-regular-expression';

const config = [
  {
    plugins: {
      regularExpression,
    },
    rules: {
      'regularExpression/banned': 'error',
      'regularExpression/required': 'error',
    },
  },
];

export default config;
