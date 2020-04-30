const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
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
  plugins: [
    new CopyPkgJsonPlugin({
      remove: ['scripts', 'devDependencies', 'build', 'dependencies'],
      replace: {
        dependencies: {
          log4js: '^6.2.1',
          sharp: '^0.25.2',
          sqlite3: '^4.1.1',
          multer: '^1.4.2',
          'class-transformer': '^0.2.3',
          'class-validator': '^0.11.0',
          express: 'latest',
          encoding: 'latest',
          'routing-controllers': 'latest',
        },
        main: './main.bundle.js',
        postinstall: 'electron-builder install-app-deps',
        scripts: { start: 'electron ./main.bundle.js' },
      },
    }),
  ],
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
