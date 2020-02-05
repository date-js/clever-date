module.exports = {
    parser:  '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'airbnb-base',
      "plugin:@typescript-eslint/eslint-recommended",
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      'import/extensions': ['error', {
        'ts': 'never',
        'json': 'always'
      }],
      'class-methods-use-this': 'off',
      'no-restricted-syntax': 'off',
      'no-param-reassign': 'off',
      'no-cond-assign': 'off',
      'no-useless-escape': 'off'
    },
    env: {
      browser: true,
    },
    settings: {
      'import/resolver': 'webpack',
    },
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
    },
};
