import { ILoggerService } from 'root/services/log/common/log';
import { getLogger, Logger, configure } from 'log4js';
import { OperatingSystem } from 'root/base/common/platform';
import { join } from 'path';
import { homedir } from 'os';

function _getLogPath(os: OperatingSystem, app_name: string) {
  switch (os) {
    case OperatingSystem.Macintosh: {
      return join(homedir(), 'Library', 'Application Support', app_name, 'logs');
    }
    case OperatingSystem.Windows: {
      return join(homedir(), app_name, 'logs');
    }
    case OperatingSystem.Linux: {
      return join(homedir(), app_name, 'logs');
    }
    default:
      throw new Error(`Can't each`);
  }
}

configure({
  appenders: {
    console: { type: 'console' },
  },
  categories: { default: { appenders: ['console'], level: 'debug' } },
});

export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor(name: string) {
    this.logger = getLogger(name);
    this.logger.level = 'debug';
  }

  getLevel() {
    return this.logger.level;
  }

  setLevel(level: string) {
    this.logger.level = level;
  }

  trace(message: any, ...args: any[]) {
    this.logger.trace(message, ...args);
  }
  debug(message: any, ...args: any[]) {
    this.logger.debug(message, ...args);
  }
  info(message: any, ...args: any[]) {
    this.logger.info(message, ...args);
  }
  warn(message: any, ...args: any[]) {
    this.logger.warn(message, ...args);
  }
  error(message: any, ...args: any[]) {
    this.logger.error(message, ...args);
  }
  fatal(message: any, ...args: any[]) {
    this.logger.fatal(message, ...args);
  }
}
