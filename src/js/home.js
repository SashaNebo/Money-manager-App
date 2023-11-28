import { elementDOM_var, home_var } from './variables.js'
import { dataNote } from './expenses.js'

const { mainContainer } = elementDOM_var
const { chartLinear, timeSelect, statisticsContent, chartHTML } = home_var

const calcTotalExpenses = array => array.reduce((acc, { value }) => (acc += +value), 0)
const calcCategoryExpenses = (c, array) => array.filter(({ category }) => category === c).reduce((acc, { value }) => (acc += +value), 0)
const calcPercentExpenses = (c, array) => calcCategoryExpenses(c, array) / (calcTotalExpenses(array) / 100)
function renderProgressLinear(array) {
  chartLinear().forEach(line => {
    switch (line.dataset.id) {
      case 'product':
        line.style.width = calcPercentExpenses('product', array) + '%'
        break
      case 'home':
        line.style.width = calcPercentExpenses('home', array) + '%'
        break
      case 'fun':
        line.style.width = calcPercentExpenses('fun', array) + '%'
        break
      case 'other':
        line.style.width = calcPercentExpenses('other', array) + '%'
        break
    }
  })
}

const getDayAgo = () => Date.now() - 86400000
const getWeekAgo = () => Date.now() - 86400000 * 7
const getMounthAgo = () => Date.now() - 86400000 * 30
const getYearAgo = () => Date.now() - 86400000 * 365

function filterStatisticsForTime({ target }) {
  function convertTime(date) {
    const time = date.split(',').reduce((acc, word, i) => {
      i < 1 ? (acc += word.trim().split('.').reverse().join('-') + 'T') : (acc += word.trim())
      return acc
    }, '')

    return time
  }

  let filterArrayForTime = []

  switch (target.value) {
    case 'day':
      filterArrayForTime = dataNote.filter(({ date }) => new Date(convertTime(date)).getTime() >= getDayAgo())
      renderFilteredStatistics(filterArrayForTime)
      break
    case 'week':
      filterArrayForTime = dataNote.filter(({ date }) => new Date(convertTime(date)).getTime() >= getWeekAgo())
      renderFilteredStatistics(filterArrayForTime)
      break
    case 'mounth':
      filterArrayForTime = dataNote.filter(({ date }) => new Date(convertTime(date)).getTime() >= getMounthAgo())
      renderFilteredStatistics(filterArrayForTime)
      break
    case 'year':
      filterArrayForTime = dataNote.filter(({ date }) => new Date(convertTime(date)).getTime() >= getYearAgo())
      renderFilteredStatistics(filterArrayForTime)
      break
  }
}

function renderFilteredStatistics(filteredArray) {
  chartHTML().remove()

  const statisticsContentHTML = `
  <div class="chart" id="chart">
    <div class="chart__list">
      <div class="chart__el">
        <h3 class="chart__title">Product <span class='chart_sum'>${calcCategoryExpenses('product', filteredArray).toFixed(2)}</span></h3>
        <div class="chart__linear chart__linear-product" data-id="product"><span class='percent'>${calcPercentExpenses('product', filteredArray).toFixed(2)}%</span></div>
      </div>
      <div class="chart__el">
        <h3 class="chart__title">Home <span class='chart_sum'>${calcCategoryExpenses('home', filteredArray).toFixed(2)}</span></h3>
        <div class="chart__linear chart__linear-home" data-id="home"><span class='percent'>${calcPercentExpenses('home', filteredArray).toFixed(2)}%</span></div>
      </div>
      <div class="chart__el">
        <h3 class="chart__title">Fun <span class='chart_sum'>${calcCategoryExpenses('fun', filteredArray).toFixed(2)}</span></h3>
        <div class="chart__linear chart__linear-fun" data-id="fun"><span class='percent'>${calcPercentExpenses('fun', filteredArray).toFixed(2)}%</span></div>
      </div>
      <div class="chart__el">
        <h3 class="chart__title">Other <span class='chart_sum'>${calcCategoryExpenses('other', filteredArray).toFixed(2)}</span></h3>
        <div class="chart__linear chart__linear-other" data-id="other"><span class='percent'>${calcPercentExpenses('other', filteredArray).toFixed(2)}%</span></div>
      </div>
    </div>

    <div class="chart__sum">
      <span class="chart__sum-title">Total expenses</span>
      <span class="chart__sum-number">${calcTotalExpenses(filteredArray).toFixed(2)}</span>
      <span class="chart__sum-currency">USD</span>
    </div>
  </div>
  `

  statisticsContent().insertAdjacentHTML('beforeend', statisticsContentHTML)
  renderProgressLinear(dataNote)
}

function startHome() {
  const homeHTML = `
    <div class="home" data-active="active-tab">
          <div class="home__container">
            <div class="home__content" id="home-content">
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

              <div class="statistics" id="statistics">
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
                <div class="chart" id="chart">
                  <div class="chart__list">
                    <div class="chart__el">
                      <h3 class="chart__title">Product <span class='chart_sum'>${calcCategoryExpenses('product', dataNote).toFixed(2)}</span></h3>
                      <div class="chart__linear chart__linear-product" data-id="product"><span class='percent'>${calcPercentExpenses('product', dataNote).toFixed(2)}%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Home <span class='chart_sum'>${calcCategoryExpenses('home', dataNote).toFixed(2)}</span></h3>
                      <div class="chart__linear chart__linear-home" data-id="home"><span class='percent'>${calcPercentExpenses('home', dataNote).toFixed(2)}%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Fun <span class='chart_sum'>${calcCategoryExpenses('fun', dataNote).toFixed(2)}</span></h3>
                      <div class="chart__linear chart__linear-fun" data-id="fun"><span class='percent'>${calcPercentExpenses('fun', dataNote).toFixed(2)}%</span></div>
                    </div>
                    <div class="chart__el">
                      <h3 class="chart__title">Other <span class='chart_sum'>${calcCategoryExpenses('other', dataNote).toFixed(2)}</span></h3>
                      <div class="chart__linear chart__linear-other" data-id="other"><span class='percent'>${calcPercentExpenses('other', dataNote).toFixed(2)}%</span></div>
                    </div>
                  </div>

                  <div class="chart__sum">
                    <span class="chart__sum-title">Total expenses</span>
                    <span class="chart__sum-number">${calcTotalExpenses(dataNote).toFixed(2)}</span>
                    <span class="chart__sum-currency">USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  `
  mainContainer.insertAdjacentHTML('beforeend', homeHTML)
  renderProgressLinear(dataNote)
  timeSelect().addEventListener('change', filterStatisticsForTime)
}

function startHomeDefault() {
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

              <div class="statistics" id="statistics">
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
  mainContainer.insertAdjacentHTML('beforeend', homeHTML)
}

export { startHome, startHomeDefault }
