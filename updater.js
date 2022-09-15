const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = "info"

autoUpdater.autoDownload = false

module.exports = () => {
  autoUpdater.checkForUpdates()

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización disponible',
      message: 'Hay una nueva versión disponible, ¿Quieres actualizar ahora?',
      buttons: ['Actualizar', 'No']
    }).then(result => {
      let button = result.response

      if(button === 0){
        autoUpdater.downloadUpdate()
      }
    })
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización lista',
      message: '¿Instalar y reiniciar ahora?',
      buttons: ['Sí', 'Después']
    })
  }).then(result => {
    let button = result.response

    if(button === 0){
      autoUpdater.quitAndInstall(false, true)
    }
  })
}