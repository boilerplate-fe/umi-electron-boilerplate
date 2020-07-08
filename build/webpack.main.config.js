const path = require('path');

function srcPaths(src) {
  return path.join(__dirname, '..', src);
}

const isEnvDevelopment = process.env.NODE_ENV === 'development';

// #region Common settings
const commonConfig = {
  entry: srcPaths('src/main/main.ts'),
  target: 'electron-main',
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvDevelopment ? 'development' : 'production',
  output: { path: srcPaths('dist'), filename: 'main.bundle.js' },
  node: { __dirname: false, __filename: false },
  resolve: {
    alias: {
      root: srcPaths('src'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};

module.exports = commonConfig;
