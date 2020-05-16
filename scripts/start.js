const chokidar = require('chokidar');
const cp = require('child_process');
const { join, resolve } = require('path');

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

const umiBin = resolve(__dirname, '..', 'node_modules', '.bin', 'umi');
const rendererEnv = Object.create(process.env);
rendererEnv.APP_ROOT = 'src/renderer';
rendererEnv.PORT = 8888;
rendererEnv.BROWSER = 'NONE';

const renderProgress = cp.spawn(umiBin, ['dev'], {
  cwd: join(__dirname, '../'),
  env: rendererEnv,
});

renderProgress.stdout.on('data', buf => {
  if (buf.toString().includes('DONE')) {
    console.log('DONE');
  }
});
