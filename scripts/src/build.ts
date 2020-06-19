import { fork } from 'child_process';
import { build } from './webpack';
import * as fs from 'fs-extra';
import { join } from 'path';
process.env.NODE_ENV = 'production';

const config = require('../../webpack.config.js');

const distPath = join(__dirname, '../../dist');
const umiBuild = require.resolve('./render/build');

async function cleanDist() {
  const files = await fs.readdir(distPath);
  await Promise.all(
    files.map(async file => {
      if (['package.json', '.gitkeep'].includes(file)) {
        return;
      }
      await fs.remove(join(distPath, file));
    })
  );
}

function buildMain() {
  return new Promise(r => {
    build({
      dev: false,
      webpackConfig: config,
      callback: (err, ee) => {
        if (err) {
          console.log(err);
          return;
        }
        const we = ee.toJson({});
        if (we.errors) {
          we.errors.forEach(error => {
            console.log(error);
          });
          return;
        }
        console.log('build success');
        r();
      },
    });
  });
}

function buildRender() {
  const rendererEnv = Object.create(process.env);
  rendererEnv.APP_ROOT = 'src/renderer';
  rendererEnv.NODE_ENV = 'production';
  return new Promise(r => {
    const cp = fork(umiBuild, [], {
      cwd: join(__dirname, '../..'),
      env: rendererEnv,
      // silent: true,
    });
    cp.on('exit', () => {
      console.log('exit');
      r();
    });
  });
}

(async () => {
  await cleanDist();
  buildMain();
  await buildRender();
})();
