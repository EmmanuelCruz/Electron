const { ipcRenderer } = require('electron')
const items = require('./items')

// Modal
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemURL = document.getElementById('url'),
  search = document.getElementById('search')

search.addEventListener('keyup', e => {
  Array.from( document.getElementsByClassName('read-item') ).forEach(item => {
    let hasMatch = item.innerText.toLowerCase().includes(search.value)
    item.style.display = hasMatch ? 'flex' : 'none'
  })
})

// Open modal from menu
ipcRenderer.on('menu-show-modal', () => {
  showModal.click()
})

ipcRenderer.on('menu-open-item', () => {
  items.open()
})

ipcRenderer.on('menu-open-item-native', () => {
  items.openNative()
})

ipcRenderer.on('delete-item', () => {
  let selected = items.getSelectedItem()
  items.delete(selected.index)
})

ipcRenderer.on('menu-search', () => {
  search.focus()
})

document.addEventListener('keydown', e=> {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    items.changeSelection(e.key)
  }
})

const toggleModalButtons = () => {
  console.log("Additem",addItem.disabled)
  if(addItem.disabled === true) {
    addItem.disabled = false
    addItem.style.opacity = 1
    addItem.innerText = 'Agregar'
    closeModal.style.display = 'inline'
  } else {
    addItem.disabled = true
    addItem.style.opacity = 0.5
    addItem.innerText = 'Agregando...'
    closeModal.style.display = 'none'
  }
}

// Muestra el modal
showModal.addEventListener('click', e => {
  modal.style.display = 'flex'
})

// Ocualta el modal
closeModal.addEventListener('click', e => {
  modal.style.display = 'none'
})

addItem.addEventListener('click', e => {
  if (itemURL.value) {
    ipcRenderer.send('new-item', itemURL.value)

    toggleModalButtons()
  }
})

itemURL.addEventListener('click', e => {
  if(e.key === 'Enter') addItem.click()
})

ipcRenderer.on('new-item-success', (e, newItem) => {

  items.addItem(newItem, true)

  toggleModalButtons()

  modal.style.display = 'none'
  itemURL.value = ''
})