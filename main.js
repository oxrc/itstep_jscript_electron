var login_page = require("./create_start");
var about_page = require("./create_about");

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const path = require('path')
const url = require('url')
const template = [
   {
      label: 'Users',
      submenu: [
        {label: 'Search'},
        {label: 'Add user'},
        {label: 'Edit existing'}
      ]
   },
   {
     label: 'Interests',
     submenu: [
        {label: 'Add new interests'},
        {label: 'View All'}
     ]
   },
   {
     label: 'Help',
     submenu: [
       {label:'How to use'},
       {label: 'Credits'},
       {label: 'About'}
     ]
   },
   {
     label: 'Account',
     submenu: [
       {label:'Sign out'}
    ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

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
