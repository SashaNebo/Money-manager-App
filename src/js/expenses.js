import { elementDOM_var, expense_var } from './variables.js'

const { put, overlay } = elementDOM_var
const { noteForm, allNoteInput, removeButton, editButton } = expense_var

export let dataNote = []

const mark = {
  id: 0,
  category: '',
  value: 0,
  date: '',
}

let markId = null

function renderExpenseField() {
  const expenseContent = document.getElementById('expense-content')
  dataNote.forEach(({ id, category, value, date }, i) => {
    const expenseField = `
    <div class="expense-field" id="${id}">
      <div class="expense-field__info" id="place">${i + 1}</div>
      <div class="expense-field__info">${category}</div>
      <div class="expense-field__info">$${value}</div>
      <div class="expense-field__info">${date}</div>
      <button class="expense-field__button expense-field__button_info">More Info</button>
      <button class="expense-field__button expense-field__button_edit">Edit</button>
      <button class="expense-field__button expense-field__button_remove">Remove</button>
    </div>
  `
    expenseContent.insertAdjacentHTML('beforeend', expenseField)
  })

  haveMark()
}

function openNote() {
  noteForm.classList.toggle('none')
  overlay.classList.toggle('none')

  if (!noteForm.closest('.none')) {
    put.children[0].textContent = 'x'
    markId !== null ? fillInput() : 0
  } else {
    put.children[0].textContent = '+'
    markId = null
    allNoteInput.forEach(input => (input.value = ''))
  }
}

function fillInput() {
  const dataInput = dataNote.filter(d => d.id === markId)[0]

  function convertTime(date) {
    const time = date.split(',').reduce((acc, word, i) => {
      i < 1 ? (acc += word.trim().split('.').reverse().join('-') + 'T') : (acc += word.trim())
      return acc
    }, '')

    return time
  }

  allNoteInput.forEach(input => {
    switch (input.dataset.id) {
      case 'input-category':
        input.value = dataInput.category.toLowerCase()
        break
      case 'input-value':
        input.value = dataInput.value
        break
      case 'input-date':
        input.value = convertTime(dataInput.date) !== '' ? convertTime(dataInput.date) : 0
        break
    }
  })
}

function handleNoteForm(e) {
  e.preventDefault()

  if (markId !== null) return editMark()

  dataNote.push({ ...mark })
  allNoteInput.forEach(input => (input.value = ''))
  addMark(mark)
  openNote()
}

function handleNoteInput() {
  switch (this.dataset.id) {
    case 'input-category':
      mark.category = this.value
      break
    case 'input-value':
      mark.value = this.value
      break
    case 'input-date':
      console.log(this.value)
      mark.date = new Date(this.value).toLocaleString()
      break
  }

  markId !== null ? (mark.id = markId) : (mark.id = Date.now())
}

const haveMark = () => {
  if (removeButton().length < 1) return

  removeButton().forEach(button => button.addEventListener('click', removeMark))
  editButton().forEach(button => button.addEventListener('click', findMarkId))
}

function addMark(mark) {
  const expenseContent = document.getElementById('expense-content')
  const { id, category, value, date } = mark

  if (!expenseContent) return

  const markHTML = `
    <div class="expense-field" id="${id}">
      <div class="expense-field__info" id="place">${dataNote.length}</div>
      <div class="expense-field__info">${category}</div>
      <div class="expense-field__info">$${value}</div>
      <div class="expense-field__info">${date}</div>
      <button class="expense-field__button expense-field__button_info">More Info</button>
      <button class="expense-field__button expense-field__button_edit">Edit</button>
      <button class="expense-field__button expense-field__button_remove">Remove</button>
    </div>
  `

  expenseContent.insertAdjacentHTML('beforeend', markHTML)
  haveMark()
}

function removeMark() {
  const numFieldAll = document.querySelectorAll('#place')
  const currentField = this.closest('.expense-field')
  const currentFieldId = +currentField.id
  const currentFieldNum = +currentField.children[0].textContent

  currentField.remove()

  dataNote.forEach(({ id }, i) => (id === currentFieldId ? dataNote.splice(i, 1) : 0))
  numFieldAll.forEach((num, i) => (i + 1 > currentFieldNum ? (num.innerText = i) : 0))
}

function editMark() {
  const fields = Array.from(document.querySelectorAll('.expense-field'))
  const currentField = fields.filter(field => +field.id === markId)[0]

  const fieldCategory = currentField.children[1]
  const fieldValue = currentField.children[2]
  const fieldDate = currentField.children[3]

  dataNote.forEach((obj, i) => (obj.id === markId ? dataNote.splice(i, 1, mark) : 0))

  fieldCategory.textContent = mark.category
  fieldValue.textContent = mark.value
  fieldDate.textContent = mark.date

  allNoteInput.forEach(input => (input.value = ''))
  openNote()
}

function findMarkId() {
  markId = +this.closest('.expense-field').id
  openNote()
}

export { renderExpenseField, handleNoteForm, handleNoteInput, addMark, openNote, haveMark, removeMark }
