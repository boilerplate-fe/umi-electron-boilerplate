export default {
  history: 'browser',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        pwa: true,
        antd: true,
        dva: false,
        title: 'umi-electron-boilerplate',
        hardSource: false,
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', redirect: '/index' }],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8887',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
};
