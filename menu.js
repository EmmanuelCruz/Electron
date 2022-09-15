const {Menu, shell} = require('electron')

module.exports = appWind => {
  let template = [
    {
      label: 'Acciones',
      submenu: [
        {
          label: 'Agregar nuevo',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            appWind.send('menu-show-modal')
          }
        },
        {
          label: 'Leer registro',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            appWind.send('menu-open-item')
          }
        },
        {
          label: 'Eliminar registro',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            appWind.send('delete-item')
          }
        },
        {
          label: 'Abrir en servidor',
          accelerator: 'CmdOrCtrl+B',
          click: () => {
            appWind.send('menu-open-item-native')
          }
        },
        {
          label: 'Buscar',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            appWind.send('menu-search')
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      role: 'windowMenu'
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Aprender más',
          click: () => {
            shell.openExternal('https://www.electronjs.org/es/docs/latest')
          }
        }
      ]
    }
  ]

  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}