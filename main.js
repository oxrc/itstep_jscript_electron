const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow
let win

function createHowToUsePage() {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'how_to_use.html'),
        protocol: 'file',
        slashes: true
    }))

    win.on('closed', function() {
        win = null
    })
}


function createWindow() {

    mainWindow = new BrowserWindow({ width: 800, height: 600 })
        //new_user = new BrowserWindow({ width: 1000, height: 800 });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))


    // new_user.loadURL(url.format({
    //     pathname: path.join(__dirname, 'add_user.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))


    mainWindow.on('closed', function() {
        mainWindow = null
    })
}


app.on('ready', createWindow)


app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})