import { chalk, yParser } from '@umijs/utils';
import { Service } from './ServiceWithBuiltIn';
import getCwd from './getCwd';

const args = yParser(process.argv.slice(2));

(async () => {
  try {
    const cwd = getCwd();
    const service = new Service({
      cwd: cwd,
    });
    await service.run({
      name: 'dev',
      args,
    });
    let closed = false;
    // eslint-disable-next-line no-inner-declarations
    function onSignal(signal: string) {
      if (closed) return;
      closed = true;

      // 退出时触发插件中的onExit事件
      service.applyPlugins({
        key: 'onExit',
        type: service.ApplyPluginsType.event,
        args: {
          signal,
        },
      });
      process.exit(0);
    }

    // kill(2) Ctrl-C
    process.once('SIGINT', () => onSignal('SIGINT'));
    // kill(3) Ctrl-\
    process.once('SIGQUIT', () => onSignal('SIGQUIT'));
    // kill(15) default
    process.once('SIGTERM', () => onSignal('SIGTERM'));
  } catch (e) {
    console.error(chalk.red(e.message));
    console.error(e.stack);
    process.exit(1);
  }
})();
