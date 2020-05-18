import { fork } from 'child_process';

const umiDev = require.resolve('umi/lib/scripts/realDev.js');

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
  renderProgress.on('message', e => {
    console.log(e);
  });

  return () => {
    renderProgress.kill('SIGINT');
  };
}
