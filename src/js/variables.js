const elementDOM_var = {
  mainContainer: document.getElementById('main'),
  tabs: document.querySelectorAll('.tab-button'),
  overlay: document.getElementById('overlay'),
  put: document.getElementById('put'),
}

const expense_var = {
  noteForm: document.querySelector('#form'),
  allNoteInput: document.querySelectorAll('#note-input'),
  removeButton: () => document.querySelectorAll('.expense-field__button_remove'),
  editButton: () => document.querySelectorAll('.expense-field__button_edit'),
  filterButton: () => document.querySelector('.expense-field__button_filter'),
  filterBlock: () => document.getElementById('filter'),
}

export { elementDOM_var, expense_var }
