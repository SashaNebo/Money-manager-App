import { convert_var } from './variables.js'
const { store, fromSelect, toSelect, inputValue, convertForm, convertValue, convertCurrency, switchButton } = convert_var

const url = 'https://v6.exchangerate-api.com/v6/9c6242bd7e216a4a71fe397b'

let { from, to, amount } = store

async function getCurrency() {
  const response = await fetch(`${url}/codes`)
  const data = await response.json()

  return data.supported_codes
}

function switchCurrency() {
  if (!fromSelect().value || !toSelect().value) return

  fromSelect().value = to
  toSelect().value = from

  from = fromSelect().value
  to = toSelect().value
}

async function sendRequest(e) {
  e.preventDefault()

  const response = await fetch(`${url}/pair/${from}/${to}/${amount}`)
  const data = await response.json()

  renderConversionResult(data)
}

function renderConversionResult({ conversion_result }) {
  convertValue().textContent = `${+conversion_result.toFixed(2)}`
  convertCurrency().textContent = `${to}`
}

async function renderOptionHTML() {
  const data = await getCurrency()

  data.forEach(currency => {
    const option = `<option value="${currency[0]}">${currency[0]}</option>`

    fromSelect().insertAdjacentHTML('beforeend', option)
    toSelect().insertAdjacentHTML('beforeend', option)
  })
}

const handleFromSelect = ({ target }) => (from = target.value)
const handleToSelect = ({ target }) => (to = target.value)
const handleInputValue = ({ target }) => (amount = target.value)

function startConvert() {
  renderOptionHTML()

  // Events
  fromSelect().addEventListener('change', handleFromSelect)
  toSelect().addEventListener('change', handleToSelect)
  inputValue().addEventListener('input', handleInputValue)
  convertForm().addEventListener('submit', sendRequest)
  switchButton().addEventListener('click', switchCurrency)
}

export { startConvert }
