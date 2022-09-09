const { ipcRenderer } = require('electron')

// Modal
let showModal = document.getElementById('show-modal'),
  closeModal = document.getElementById('close-modal'),
  modal = document.getElementById('modal'),
  addItem = document.getElementById('add-item'),
  itemURL = document.getElementById('url')

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
  console.log("Entra a new item success")
  toggleModalButtons()

  modal.style.display = 'none'
  itemURL.value = ''
})