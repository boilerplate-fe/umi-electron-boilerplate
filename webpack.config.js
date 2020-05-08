const path = require('path');

function srcPaths(src) {
  return path.join(__dirname, src);
}

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

// #region Common settings
const commonConfig = {
  entry: './src/main/main.ts',
  target: 'electron-main',
  externals: [
    {
      log4js: `require('log4js')`,
      sharp: `require('sharp')`,
      sqlite3: `require('sqlite3')`,
      express: `require('express')`,
      encoding: `require('encoding')`,
      'routing-controllers': `require('routing-controllers')`,
      'any-promise': 'Promise',
    },
  ],
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvProduction ? 'production' : 'development',
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
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};

module.exports = commonConfig;
