import { elementDOM_var } from './variables.js'
import { dataNote, renderExpenseField } from './expenses.js'
import { startConvert } from './convert.js'
import { startHome } from './home.js'
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
            <div class="expense-field__info">Price</div>
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
    <div class="convert" id='convert' data-active="active-tab">
      <div class="convert__container">
        <div class="convert__content">
          <h3 class="convert__title">Exchange rate</h3>
           <div class="convert__w">
             <span class="convert__value">0.00</span>
             <span class="convert__currency"></span>
            </div>
          <form class='convert__form' action="GET">
            <div class="selected">
              <div class='selected__wrapper'>
                <label class='selected__label' for="from">From</label>
                <select class='selected__select' name="from" id="from" required>
                  <option class='selected__option' value="" disabled selected hidden>Choose currency</option>
                </select>
              </div>
               <div class="selected__change">
                    <svg class="switch-button" fill="#000000" width="35px" height="35px" viewBox="-1.5 -1.5 13.00 13.00" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M5,8,3,6,2,7l3,3L8,7,7,6ZM5,2,7,4,8,3,5,0,2,3,3,4Z"></path>
                        </g>
                      </g>
                    </svg>
                </div>
              <div class='selected__wrapper'>
                <label class='selected__label' for="to">To</label>
                <select class='selected__select' name="to" id="to" required>
                  <option class='selected__option' value="" disabled selected hidden>Choose currency</option>
                </select>
              </div>
            </div>
            <div class="convert__from-wrapper">
              <label class='convert__form-label' for="value">Amount</label>
              <input class="convert__form-value" type="number" id="value" autocomplete='off' required>
            </div>
            <input class="convert__form-submit" type="submit" value='submit'>
          </form>
        </div>
      </div>
    </div>
  `
  mainContainer.insertAdjacentHTML('afterbegin', convertHTML)
  startConvert()
}

function renderHome() {
  const homeHTML = `
    <div class="home" data-active="active-tab">
          <div class="home__container">
            <div class="home__content">
              <div class="data">
                <div class="data__block">
                  <h3 class="data__title">Profit avg in mounth</h3>
                  <div class="data__wrapper">
                    <div class="data__value">8933.00 <span>USD</span></div>
                  </div>
                </div>
                <div class="data__block">
                  <h3 class="data__title">Expense avg in mounth</h3>
                  <div class="data__wrapper">
                    <div class="data__value">3009.15 <span>USD</span></div>
                  </div>
                  <div class="balance">
                    <div class="balance__info">Account balance: <span>960.00</span> USD</div>
                    <div class="balance__info">Current expense: <span>2001.00</span> USD</div>
                  </div>
                </div>
              </div>

              <div class="statistics">
                <div class="statistics-header">
                  <h1 class="statistics__title">Statistics All</h1>
                  <select class='statistics__select' name="time" id="time">
                    <option class='statistics__option' value="" disabled selected hidden>Choose Time</option>
                    <option class='statistics__option' value="day">day</option>
                    <option class='statistics__option' value="week">week</option>
                    <option class='statistics__option' value="mounth">mounth</option>
                    <option class='statistics__option' value="year">year</option>
                    <option class='statistics__option' value="all">all</option>
                  </select>
                </div>
                <div class="chart">
                  <div class="chart__list">
                    <div class="chart__el">
                      <h3 class="chart__title">Product <span class='chart_sum'>1200.00</span></h3>
                      <div class="chart__linear chart__linear-product"><span class='percent'>30%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Home <span class='chart_sum'>700.00</span></h3>
                      <div class="chart__linear chart__linear-home"><span class='percent'>20%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Fun <span class='chart_sum'>400.00</span></h3>
                      <div class="chart__linear chart__linear-fun"><span class='percent'>15%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Other <span class='chart_sum'>1500.00</span></h3>
                      <div class="chart__linear chart__linear-other"><span class='percent'>35%</span></div>
                    </div>
                  </div>

                  <div class="chart__sum">
                    <span class="chart__sum-title">Total expenses</span>
                    <span class="chart__sum-number">2990.00</span>
                    <span class="chart__sum-currency">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `

  startHome()
}

export { controllActiveTab }
