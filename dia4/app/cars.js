const form = document.querySelector('[data-js="form-cars"]')
const tableCars = document.querySelector('[data-js="table-cars"]').querySelector('tbody')
const baseURL = 'http://localhost:3333/cars'

const request = async ({ url, method, data }) => {
  return await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(async (response) => {
    if (!response.ok) {
      const message = await response.json()
      throw new Error(message.message);
    }
    return await response.json();
  })
}

const insertNewCar = (car) => {
  tableCars.insertAdjacentHTML('beforeend', `
    <tr data-js="car-table-row">
      <td><img src="${car.image}" alt="${car.model}" /></td>
      <td>${car.brandModel}</td>
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
  registerNewCar(newCar)
  event.target.reset()
  event.target.querySelector('#image').focus()
})

const getCars = async () => {
  try {
    const cars = await request({
      url: baseURL,
      method: 'GET'
    })

    if (cars.length === 0) {
      tableCars.insertAdjacentHTML('beforeend', `
        <tr class="empty-message">
          <td></td>
          <td></td>
          <td>Nenhum carro encontrado</td>
          <td></td>
          <td></td>
        </tr>
      `)
    }

    const rowEmptyMessage = document.querySelector('.empty-message')
    if(cars.length > 0 && rowEmptyMessage){
      tableCars.removeChild(rowEmptyMessage)
    }

    const rows = document.querySelectorAll('[data-js="car-table-row"]')

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        const rowCar = rows.item(i)
        tableCars.removeChild(rowCar)
      }
    }

    cars.forEach((car) => insertNewCar(car))

  } catch (error) {
    console.log(error)
  }
}

const registerNewCar = async (newCar) => {
  try {
    const response = await request({
      url: baseURL,
      method: 'POST',
      data: newCar
    })

    getCars()

  } catch (err) {
    console.log(err.message)
  }
}

getCars()
