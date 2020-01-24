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
        'ts': 'never'
      }],
      'class-methods-use-this': 'off',
      /*'@typescript-eslint/no-var-requires': "off",

      'max-len': ['error', {
        "code": 130
      }],
      'global-require': 'off',

      'import/no-named-default': 'off'*/
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
