import { build } from './webpack';
import * as path from 'path';
import * as cp from 'child_process';
import * as net from 'net';
import { startRender } from './renderer';

const getPort = require('get-port');

// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development';

const config = require('../../webpack.config.js');

const mainHMR = require.resolve('./main_hmr');

let electronProcess: cp.ChildProcessWithoutNullStreams;
(async () => {
  const SOCKET_PORT = await getPort();
  let socket: net.Socket | null;
  const server = net.createServer();
  server.on('connection', _socket => {
    socket = _socket;
    socket.setEncoding('utf-8');
    socket.on('close', () => {
      socket = null;
    });
  });
  server.listen(SOCKET_PORT);
  startRender({
    cwd: path.join(__dirname, '../..'),
    port: 8888,
    BROWSER: 'NONE',
    APP_ROOT: 'src/renderer',
  });
  build({
    dev: true,
    webpackConfig: config,
    callback: (_err, stat) => {
      const statJson = stat.toJson({});
      const { outputPath, assets } = statJson;
      if (!outputPath || !Array.isArray(assets) || assets.length !== 1) {
        return;
      }
      const assetName = assets[0].name;
      const outputFilePath = path.join(outputPath!, assetName);
      if (!electronProcess) {
        electronProcess = cp.spawn(
          require('electron').toString(),
          [`--require ${mainHMR}`, outputFilePath],
          {
            shell: true,
            env: {
              SOCKET_PORT,
              NO_WINDOW: 'true',
            },
          }
        );
        electronProcess.stdout.on('data', e => {
          console.log(e.toString());
        });
        electronProcess.on('exit', code => {
          if (code === 100) {
            //   this.start({ port });
          }
        });
      } else {
        if (socket) {
          socket.write('exit');
        }
      }
    },
  });
})();
