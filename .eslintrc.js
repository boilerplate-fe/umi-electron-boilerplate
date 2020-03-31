module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    '@diamondyuan/react-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
  },
};
