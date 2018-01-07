module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    mocha: true,
    node: true
  },
  rules: {
    'no-console': 0,
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always']
  }
};
