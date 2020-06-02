import { fork } from 'child_process';

const umiDev = require.resolve('umi/lib/forkedDev');

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
  const renderProgress = fork(umiDev, [], {
    cwd: argv.cwd,
    env: rendererEnv,
    silent: true,
  });
  let port = 0;
  renderProgress.on('message', (e: { type: string; port: number }) => {
    if (e.type === 'DONE') {
      console.log(`umi server start http://localhost:${port}`);
    }
    if (e.type === 'UPDATE_PORT') {
      port = e.port;
    }
  });

  return () => {
    renderProgress.kill('SIGINT');
  };
}
