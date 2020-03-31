import 'reflect-metadata';
import { app, BrowserWindow } from 'electron';
import { start } from './server';
import { dev } from 'root/base/common/platform';
const kill = require('kill-port');

export function load(vanalandExtension: string) {
  (global as any).__non_webpack_require__(vanalandExtension);
}

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
  await mainWindow.loadURL('http://localhost:8888');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  if (dev) {
    await kill(8887);
  } else {
    await kill(8888);
  }
  await start(!dev);
  await createWindow();
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
