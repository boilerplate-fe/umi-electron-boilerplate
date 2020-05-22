import { ILoggerService } from 'root/services/log/common/log';
import { Container } from 'typedi';
import 'reflect-metadata';
import { app, BrowserWindow } from 'electron';
import { start } from './server';
import { dev } from 'root/base/common/platform';
import { LoggerService } from 'root/services/log/node/logManager';

const logger = new LoggerService('main');
Container.set(ILoggerService, logger);

let mainWindow: Electron.BrowserWindow | null;

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      devTools: true,
    },
  });
  mainWindow.loadURL('http://localhost:8888');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  logger.info('app ready');
  await start(!dev);
  if (!process.env.NO_WINDOW) {
    await createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
