import { fork, ChildProcess, Serializable } from 'child_process';

const umiDev = require.resolve('./render/dev');

interface StartRenderProps {
  cwd: string;
  port?: number;
  BROWSER?: 'NONE';
  APP_ROOT?: string;
}

export function startRender(argv: StartRenderProps) {
  const rendererEnv = Object.create(process.env);
  rendererEnv.APP_ROOT = argv.APP_ROOT;
  rendererEnv.PORT = argv.port;
  rendererEnv.BROWSER = argv.BROWSER;
  rendererEnv.NODE_ENV = 'development';
  let renderProgress: ChildProcess;
  function start() {
    renderProgress = fork(umiDev, [], {
      cwd: argv.cwd,
      env: rendererEnv,
    });
    let port = 0;
    renderProgress.on('message', (e: { type: string; port: number }) => {
      if (e.type === 'DONE') {
        console.log(`umi server start http://localhost:${port}`);
      }
      if (e.type === 'RESTART') {
        renderProgress.kill();
        start();
      }
      if (e.type === 'UPDATE_PORT') {
        port = e.port;
      }
    });
  }
  start();
  return (message: Serializable) => {
    renderProgress.send(message);
  };
}
