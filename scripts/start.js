const chokidar = require('chokidar');
const cp = require('child_process');
const { join } = require('path');
const { startRender } = require('./lib/renderer');

const dist = join(__dirname, '..', 'dist');
const main = join(dist, 'main.bundle.js');

class ElectronManager {
  start() {
    const electronProcess = cp.spawn(require('electron').toString(), [main], {
      env: {
        NO_WINDOW: true,
      },
    });
    this.electronProcess = electronProcess;
    this.electronProcess.on('exit', () => {
      setImmediate(() => {
        this.start();
      });
    });
  }

  exit() {
    this.electronProcess.kill('SIGINT');
  }
}

const electronManager = new ElectronManager();
electronManager.start();

const watcher = chokidar.watch('main.bundle.js', {
  cwd: dist,
});

watcher.on('change', () => {
  electronManager.exit();
});

const exitRender = startRender({
  cwd: join(__dirname, '..'),
  port: 8888,
  BROWSER: 'NONE',
  APP_ROOT: 'src/renderer',
});

process.on('SIGINT', () => {
  exitRender();
});
