module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb/hooks', 'eslint-config-prettier', 'prettier'],
  plugins: ['fp', 'prettier', 'react', 'react-hooks', 'jsx-a11y'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Default eslint rules
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['warn', 'always-multiline'],
    complexity: ['warn', 12], // TODO: Define value for complexity
    'jsx-quotes': ['warn', 'prefer-single'],
    'max-depth': ['warn', 3],
    'max-lines': ['warn', 400],
    'max-lines-per-function': ['warn', 400],
    'max-params': ['warn', 10],
    'max-nested-callbacks': ['warn', 4],
    'no-param-reassign': 'warn',
    // fp eslint rules
    'fp/no-let': 'warn',
    'fp/no-mutating-assign': 'warn',
    // Prettier rules
    'prettier/prettier': ['error'],
    // React eslint rules
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prop-types': [2, { ignore: ['children'], skipUndeclared: true }],
    // React-hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
  },
};
