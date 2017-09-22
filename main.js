const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})
  new_user = new BrowserWindow({width: 1000, height: 800});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  new_user.loadURL(url.format({
    pathname: path.join(__dirname, 'add_user.html'),
    protocol: 'file:',
    slashes: true
  }))




  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})





const template = [
   {
      label: 'Application',
      submenu: [
        {label: 'Quite', role: 'close'}
      ]
   },
   {
     label: 'View',
     submenu: [
        {label: 'ToggleDevTools', role:'toggledevtools'},
        {label: 'Reload', role: 'reload'}
     ]
   },
   {
     label: 'Users',
     submenu: [
       {label:'List', accelerator: 'Ctrl+Alt+L'},
       {label: 'Add', accelerator: 'Ctrl+Alt+A'}
     ]
   },
   {
     label: 'Interests',
     submenu: [{label:'Add'}]
   },
   {
     label: 'Login',
     submenu: [{label:'Log out'}]
   }
]





const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
