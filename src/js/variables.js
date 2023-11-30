const elementDOM_var = {
  mainContainer: document.getElementById('main'),
  tabs: document.querySelectorAll('.tab-button'),
  overlay: document.getElementById('overlay'),
  put: document.getElementById('put'),
  change: document.getElementById('change'),
}

const expense_var = {
  noteForm: document.querySelector('#form'),
  allNoteInput: document.querySelectorAll('#note-input'),
  removeButton: () => document.querySelectorAll('.expense-field__button_remove'),
  editButton: () => document.querySelectorAll('.expense-field__button_edit'),
  filterButton: () => document.querySelector('.expense-field__button_filter'),
  filterBlock: () => document.getElementById('filter'),
}

const convert_var = {
  fromSelect: () => document.getElementById('from'),
  toSelect: () => document.getElementById('to'),
  inputValue: () => document.getElementById('value'),
  convertForm: () => document.querySelector('.convert__form'),
  convertValue: () => document.querySelector('.convert__value'),
  convertCurrency: () => document.querySelector('.convert__currency'),
  switchButton: () => document.querySelector('.switch-button'),
  store: {
    from: '',
    to: '',
    amount: '',
  },
}

const home_var = {
  chartLinear: () => document.querySelectorAll('.chart__linear'),
  timeSelect: () => document.getElementById('time'),
  statisticsContent: () => document.getElementById('statistics'),
  chartHTML: () => document.getElementById('chart'),
  titleCategory: () => document.querySelector('.statistics__title'),
  homeDataValueEl: () => document.querySelectorAll('.data__value'),
  currencySelect: () => document.getElementById('currency'),
}

export { elementDOM_var, expense_var, convert_var, home_var }
