import * as webpack from 'webpack';

interface BuildConfig {
  dev?: boolean;
  callback: webpack.Compiler.Handler;
  webpackConfig: webpack.Configuration;
}

export const build = (config: BuildConfig) => {
  const compiler = webpack(config.webpackConfig);
  if (config.dev) {
    compiler.watch({}, config.callback);
  } else {
    compiler.run(config.callback);
  }
};
