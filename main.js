var login_page = require("./create_start");
var about_page = require("./create_about");
var create_add_user = require("./create_add_user");


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


  //Main Window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
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

//MenuItem

const template = [
   {
      label: 'Users',
      submenu: [
        {
          label: 'Search',
          click: function() { }
        },
        {
          label: 'Add user',
          accelerator: 'Ctrl+F1',
          click: function() {
              create_add_user.create_add_user();
           }
        },
        {
          label: 'Edit existing',
          click: function() {  }
        }
      ]
   },
   {
     label: 'Interests',
     submenu: [
        {
          label: 'Add new interests'
        },
        {
          label: 'View All'
        }
     ]
   },
   {
     label: 'Help',
     submenu: [
       {
         label:'How to use'
        },
       {
         label: 'Credits'
        },
       {
         label: 'About',
         accelerator: 'Ctrl+F2',
         click: function() {
            about_page.create_about();
         }
        }
     ]
   },
   {
     label: 'Account',
     submenu: [
       {
         label:'Sign out',
         accelerator: 'Ctrl+Q',
         click: function() {
             createWindow();
          }
        }
    ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// let mainWindow

// function createWindow() {
//   // Create the browser window.

//   mainWindow = new BrowserWindow({width: 800, height: 600})
//   new_user = new BrowserWindow({width: 1000, height: 800});

//   //Main Window
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//

//   Open the DevTools.
//   mainWindow.webContents.openDevTools()
//
//   mainWindow.on('closed', function () {
//     mainWindow = null
//   })
// }

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
