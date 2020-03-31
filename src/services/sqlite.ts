import { Token } from 'typedi';
import { Database } from 'sqlite';

export interface ISqliteService {
  init(): Promise<void>;
  destroy(): void;
  get(): Database;
}

export const ISqliteService = new Token<ISqliteService>();
