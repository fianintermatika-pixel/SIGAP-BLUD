const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 832,
    minWidth: 1024,
    minHeight: 700,
    title: 'SIGAP BLUD',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  });

  win.removeMenu();
  win.loadFile('index.html');

  // Blokir devtools shortcut di production
  win.webContents.on('before-input-event', (event, input) => {
    if (
      (input.control && input.shift && (input.key === 'I' || input.key === 'i')) ||
      (input.control && (input.key === 'r' || input.key === 'R')) ||
      (input.key === 'F12')
    ) {
      event.preventDefault();
    }
  });
}

// Menu bar kosong = tidak bisa inspect
Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
