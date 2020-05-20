const chokidar = require('chokidar');
const cp = require('child_process');
const { join } = require('path');
const getPort = require('get-port');
const net = require('net');
const dist = join(__dirname, '..', 'dist');
const main = join(dist, 'main.bundle.js');

class ElectronManager {
  start({ port }) {
    const electronProcess = cp.spawn(require('electron').toString(), [main], {
      env: {
        SOCKET_PORT: port,
        NO_WINDOW: true,
      },
    });
    this.electronProcess = electronProcess;
    this.electronProcess.on('exit', code => {
      if (code === 100) {
        this.start({ port });
      }
    });
  }
}

const electronManager = new ElectronManager();
const watcher = chokidar.watch('main.bundle.js', {
  cwd: dist,
});

(async () => {
  const SOCKET_PORT = await getPort();
  let socket;
  const server = net.createServer();
  server.on('connection', _socket => {
    socket = _socket;
    socket.setEncoding('utf-8');
    socket.on('close', () => {
      socket = null;
    });
  });
  server.listen(SOCKET_PORT);
  watcher.on('change', () => {
    if (socket) {
      socket.write('exit');
    }
  });
  electronManager.start({ port: SOCKET_PORT });
})();
