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
  add_user = new BrowserWindow({width: 1000, height: 800, show:false});

  //Main Window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //Add user Window
  add_user.loadURL(url.format({
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

//MenuItem
const template = [
   {
      label: 'Users',
      submenu: [
        {
          label: 'Search',
          click: function() { console.log('User Searc') }
        },
        {
          label: 'Add user',
          click: function() {
                
           }
        },
        {
          label: 'Edit existing',
          click: function() { console.log('Edit existing') }
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
         label: 'About'
        }
     ]
   },
   {
     label: 'Account',
     submenu: [
       {
         label:'Sign out',
         click: function() { console.log('time to print stuff') }
        }
    ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
