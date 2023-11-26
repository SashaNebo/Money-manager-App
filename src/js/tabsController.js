import { elementDOM_var } from './variables.js'
import { dataNote, renderExpenseField } from './expenses.js'

const { mainContainer } = elementDOM_var

function controllActiveTab() {
  if (this.closest('.tab-button_active')) return

  const activeTabSection = document.querySelector('[data-active="active-tab"]')
  const activeTabButton = document.querySelector('.tab-button_active')
  const addActive = () => this.classList.add('tab-button_active')

  switch (this.id) {
    case 'tab-button-expense':
      addActive()
      renderExpense()
      break
    case 'tab-button-convert':
      addActive()
      renderConvert()
      break
    case 'tab-button-chart':
      addActive()
      renderChart()
      break
    case 'tab-button-home':
      addActive()
      renderHome()
      break
  }

  activeTabSection ? activeTabSection.remove() : null
  activeTabButton.classList.remove('tab-button_active')
}

// Function render

function renderExpense() {
  const expenseHTML = `
    <div class="expense" id='expense' data-active="active-tab">
      <div class="expense-container">
        <div class="expense-content" id='expense-content'>
          <div class="expense-field">
            <div class="expense-field__info">№</div>
            <div class="expense-field__info">Category</div>
            <div class="expense-field__info">Amount</div>
            <div class="expense-field__info">Date</div>
            <button class="expense-field__button expense-field__button_filter">Filter</button>
          </div>
        </div>
      </div>
    </div>
  `
  mainContainer.insertAdjacentHTML('afterbegin', expenseHTML)

  if (dataNote.length > 0) renderExpenseField(dataNote)
}

function renderConvert() {
  const convertHTML = `
    <div class="convert development-section" id='convert' data-active="active-tab">
      <h3>Convert in development ...</h3>
    </div>
  `
  mainContainer.insertAdjacentHTML('afterbegin', convertHTML)
}

function renderChart() {
  const chartHTML = `
    <div class="chart development-section" id='chart' data-active="active-tab">
      <h3>Chart in development ...</h3>
    </div>
  `
  mainContainer.insertAdjacentHTML('afterbegin', chartHTML)
}

function renderHome() {
  const homeHTML = `
    <div class="home development-section" id='home' data-active="active-tab">
      <h3>Home in development ...</h3>
    </div>
  `
  mainContainer.insertAdjacentHTML('afterbegin', homeHTML)
}

export { controllActiveTab }
