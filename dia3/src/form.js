const form = document.querySelector('[data-js="form"]')
const inputName = document.querySelector('[data-js="name"]')
inputName.oninput = handleInput

const capitalize = (string) => {
  const array = string.split(' ')
  const notCapitalize = ["de", "da", "do", "dos"]

  const newArray = array.map((string) => {
    const newString = string.toLowerCase()

    if (!notCapitalize.includes(newString) && newString !== "") {
      return newString[0].toUpperCase() + newString.substr(1)
    }

    return newString
  })

  return newArray.join(' ')
}

function handleInput(event) {
  const { value } = event.target
  this.value = capitalize(value)
}


form.insertAdjacentHTML('beforeend', `
  <select name="colors" data-js="select-colors" multiple size="5"></select>
  <div data-js="div-colors"></div>
`)

const selectColors = document.querySelector('[data-js="select-colors"]')
const divColors = document.querySelector('[data-js="div-colors"]')
const colors = [
  {
    text: 'Eton Blue',
    value: '#9BC995'
  },
  {
    text: 'Cambridge Blue',
    value: '#98B9AB'
  },
  {
    text: 'Blue Yonder',
    value: '#5171A5'
  },
  {
    text: 'English Violet',
    value: '#3F3047'
  },
  {
    text: 'Icterine',
    value: '#EEF36A'
  }
]

colors.forEach((color) => {
  const option = document.createElement("option")
  option.value = color.value
  option.textContent = color.text
  selectColors.appendChild(option)
})

selectColors.addEventListener("change", (event) => {
  const selectedColors = event.target.selectedOptions
  divColors.innerHTML = ''

  for (let i = 0; i < selectedColors.length; i++) {
    const square = document.createElement("div")
    square.className = "square-color"
    square.style.background = selectedColors.item(i).value
    divColors.appendChild(square)
  }
})

form.addEventListener("submit", (event) => event.preventDefault())
