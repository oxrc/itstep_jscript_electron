function create_how_to_use() {
  const electron = require('electron');
  const BrowserWindow = electron.BrowserWindow;
  const path = require('path')
  const url = require('url')
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'how_to_use.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
exports.createHowToUsePage = create_how_to_use;