import { app, BrowserWindow } from 'electron';
import http from 'http';
import path from 'path';
import url from 'url';

function startServer(message: string) {
  http
    .createServer(function(_request, response) {
      response.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      });
      response.end(JSON.stringify({ data: message }));
    })
    .listen(10000);
}

/**
 * 可以试试看，修改 message,页面自动刷新。
 * You can try to modify the message and the page will refresh automatically.
 */
startServer('Hello World');

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
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8888');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
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
