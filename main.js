const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const addon = require('./index.node');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  win.webContents.openDevTools()
  win.loadFile('./core/index.html')
  ipcMain.on('send', (event, ...arg) => {
    console.log(event, arg)

    let res = addon.gray({ obj: "u" }, 32);
    console.log("js:", res);
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
  // if (process.platform !== 'darwin') {
  // }
})

