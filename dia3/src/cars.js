const form = document.querySelector('[data-js="form-cars"]')
const tableCars = document.querySelector('[data-js="table-cars"]').querySelector('tbody')

const insertNewCar = (car) => {
  tableCars.insertAdjacentHTML('beforeend', `
    <tr>
      <td><img src="${car.image}" alt="${car.model}" /></td>
      <td>${car.model}</td>
      <td>${car.year}</td>
      <td>${car.plate}</td>
      <td>${car.color}</td>
    </tr>
  `)
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  let newCar = {}

  const inputs = event.target.querySelectorAll('input')
  for (let i = 0; i < inputs.length; i++) {
    const { name, value } = inputs.item(i)
    newCar = {
      ...newCar,
      [name]: value
    }
  }
  event.target.reset()
  event.target.querySelector('#image').focus()
  insertNewCar(newCar)
})
