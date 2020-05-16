import { resolve } from 'path';
import { spawn } from 'child_process';

interface StartRenderProps {
  cwd: string;
  port?: number;
  BROWSER?: 'NONE';
  APP_ROOT?: string;
}

export function startRender(argv: StartRenderProps) {
  const umiBin = resolve(argv.cwd, 'node_modules', '.bin', 'umi');
  const rendererEnv = Object.create(process.env);
  rendererEnv.APP_ROOT = argv.APP_ROOT;
  rendererEnv.PORT = argv.port;
  rendererEnv.BROWSER = argv.BROWSER;
  const renderProgress = spawn(umiBin, ['dev'], {
    cwd: argv.cwd,
    env: rendererEnv,
  });
  renderProgress.stdout.on('data', buf => {
    if (buf.toString().includes('DONE')) {
      console.log('DONE');
    }
  });

  return () => {
    renderProgress.kill('SIGINT');
  };
}
