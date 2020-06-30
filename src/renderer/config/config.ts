import { defineConfig } from 'umi';

export default defineConfig({
  history: { type: 'hash' },
  outputPath: `../../dist/renderer`,
  publicPath: './',
  title: 'umi-electron-boilerplate',
  plugins: ['@umijs/plugin-antd'],
  dva: false,
  antd: {
    dark: true,
  },
  routes: [
    {
      path: '/',
      routes: [{ path: '/', component: './index' }],
    },
  ],
});
