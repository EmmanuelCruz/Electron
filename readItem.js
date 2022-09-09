
// Modules
const { BrowserWindow, app } = require('electron')

// Offscreen BrowserWindow
let offscreenWindow

// Exported readItem function
module.exports = (url, callback) => {

  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  // Load item url
  offscreenWindow.loadURL(url)

  // Wait for content to finish loading
  offscreenWindow.webContents.on('did-finish-load', async e => {
    console.log('Finished loading content')
    // Get page title
    let title = offscreenWindow.getTitle()

    offscreenWindow.webContents.capturePage().then(image => {
      // Get image as dataURL
      let screenshot = image.toDataURL()

      // Execute callback with new item object
      callback({ title, screenshot, url })

      // Clean up
      offscreenWindow.close()
      offscreenWindow = null
    })

  })
}
