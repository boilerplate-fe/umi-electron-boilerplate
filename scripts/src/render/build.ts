import { chalk, yParser } from '@umijs/utils';
import { Service } from './ServiceWithBuiltIn';
import getCwd from './getCwd';
import getPkg from './getPkg';

const args = yParser(process.argv.slice(2));

(async () => {
  try {
    const cwd = getCwd();
    const service = new Service({
      cwd: cwd,
      pkg: getPkg(process.cwd()),
    });
    await service.run({
      name: 'build',
      args,
    });
  } catch (e) {
    console.error(chalk.red(e.message));
    console.error(e.stack);
    process.exit(1);
  }
})();
