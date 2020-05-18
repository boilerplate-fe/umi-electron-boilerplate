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
      component: '../layouts/index',
      routes: [{ path: '/', component: './index' }],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8887',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
});
