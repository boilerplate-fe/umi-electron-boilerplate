import { Token } from 'typedi';

export interface ILoggerService {
  getLevel(): string;
  setLevel(level: string): void;
  trace(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  fatal(message: any, ...args: any[]): void;
}

export const ILoggerService = new Token<ILoggerService>();
