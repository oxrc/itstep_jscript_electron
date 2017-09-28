var login_page = require("./create_start");
var about_page = require("./create_about");

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  // Create the browser window.

  mainWindow = new BrowserWindow({width: 800, height: 600})
  new_user = new BrowserWindow({width: 1000, height: 800});
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  new_user.loadURL(url.format({
    pathname: path.join(__dirname, 'add_user.html'),
    protocol: 'file:',
    slashes: true
  }))
 
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', login_page.create_login)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    login_page.create_login()
  }
})


