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
  proxy: {
    '/api': {
      target: 'http://localhost:8887',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
};
