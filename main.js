import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 832,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  win.removeMenu();
  win.loadFile('index.html');
}

Menu.setApplicationMenu(null);
app.whenReady().then(createWindow);
