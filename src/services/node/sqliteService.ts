import { Service } from 'typedi';
import { ISqliteService } from 'root/services/sqlite';
import { Database, open } from 'sqlite';

export class SqliteService implements ISqliteService {
  private database: Database | null;
  constructor(database?: Database) {
    if (database) {
      this.database = database;
    }
  }

  async init(): Promise<void> {
    const db = await open(':memory:');
    await db.run('CREATE TABLE lorem (info TEXT)');
    let stmt = await db.prepare('INSERT INTO lorem VALUES (?)');
    for (let i = 0; i < 10; i++) {
      await stmt.run(`Ipsum ${i}`);
    }
    await stmt.finalize();
    this.database = db;
  }

  get(): Database {
    if (!this.database) {
      throw new Error('');
    }
    return this.database;
  }

  destroy(): void {
    this.database = null;
  }
}

Service(ISqliteService)(SqliteService);
