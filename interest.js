function interest_window() {
    const electron = require('electron')
    const BrowserWindow = electron.BrowserWindow
    const path = require('path')
    const url = require('url')

    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'interest.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {

        mainWindow = null
    })
}

exports.interesJS = interest_window;
