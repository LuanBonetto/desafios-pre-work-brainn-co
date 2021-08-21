import './main'

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
