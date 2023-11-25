import { elementDOM_var, expense_var } from './variables.js'
import { handleNoteForm, handleNoteInput, toggleNote } from './expenses.js'
import { controllActiveTab } from './tabsController.js'

const { tabs } = elementDOM_var
const { noteForm, allNoteInput } = expense_var

// Expenses
noteForm.addEventListener('submit', handleNoteForm)
allNoteInput.forEach(input => input.addEventListener('input', handleNoteInput))
put.addEventListener('click', toggleNote)

// Tabs controller
tabs.forEach(tab => tab.addEventListener('click', controllActiveTab))
