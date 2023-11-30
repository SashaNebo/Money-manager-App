import { elementDOM_var, expense_var } from './variables.js'
import { handleNoteForm, handleNoteInput, toggleNote, openFilter } from './expenses.js'
import { controllActiveTab } from './tabsController.js'
const { tabs } = elementDOM_var
const { noteForm, allNoteInput, filterButton, currencyElement } = expense_var

// Tabs controller
tabs.forEach(tab => tab.addEventListener('click', controllActiveTab))

// Currency Element
if (localStorage.getItem('currency')) {
  currencyElement.textContent = JSON.parse(localStorage.getItem('currency'))
}

// Expenses
noteForm.addEventListener('submit', handleNoteForm)
allNoteInput.forEach(input => input.addEventListener('input', handleNoteInput))
put.addEventListener('click', toggleNote)
filterButton().addEventListener('click', openFilter)
