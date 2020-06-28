import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'browser' },
  outputPath: `../../dist/renderer`,
  publicPath: './',
  title: 'umi-electron-boilerplate',
  plugins: ['@umijs/plugin-antd'],
  dva: false,
  antd: {},
  routes: [
    {
      path: '/',
      routes: [{ path: '/', component: './index' }],
    },
  ],
});
