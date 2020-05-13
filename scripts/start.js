const chokidar = require('chokidar');
const cp = require('child_process');
const { join } = require('path');

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
