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

function showMessage({ message, type }) {
  const snackbar = document.getElementById("snackbar");

  let { className } = snackbar
  className = "show"

  if (type === "success") {
    snackbar.className = `${className} success`
  }

  if (type === "error") {
    snackbar.className = `${className} error`
  }

  snackbar.textContent = message

  setTimeout(() => { snackbar.className = snackbar.className.replace("show", "") }, 3000)
}

const insertNewCar = (car) => {
  tableCars.insertAdjacentHTML('beforeend', `
    <tr data-js="car-table-row">
      <td><img src="${car.image}" alt="${car.model}" /></td>
      <td>${car.brandModel}</td>
      <td>${car.year}</td>
      <td>${car.plate}</td>
      <td>${car.color}</td>
      <td><button data-js="button-delete" data-plate="${car.plate}" type="button">Deletar</button></td>
    </tr>
  `)
}

const getCars = async () => {
  try {
    const cars = await request({
      url: baseURL,
      method: 'GET'
    })

    if (cars.length === 0) {
      tableCars.insertAdjacentHTML('beforeend', `
        <tr class="empty-message">
          <td colspan="6">Nenhum carro encontrado</td>
        </tr>
      `)
    }

    const rowEmptyMessage = document.querySelector('.empty-message')
    if (cars.length > 0 && rowEmptyMessage) {
      tableCars.removeChild(rowEmptyMessage)
    }

    const rows = document.querySelectorAll('[data-js="car-table-row"]')

    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        const rowCar = rows.item(i)
        tableCars.removeChild(rowCar)
      }
    }

    if (cars.length > 0) {
      cars.forEach((car) => insertNewCar(car))
      const allButtonDelete = document.querySelectorAll('[data-js="button-delete"]')

      if (allButtonDelete) {
        for (let i = 0; i < allButtonDelete.length; i++) {
          const button = allButtonDelete.item(i)

          button.addEventListener('click', (event) => {

            const plate = button.getAttribute('data-plate')
            deleteCar(plate)
          })
        }
      }
    }

  } catch (error) {
    showMessage({
      message: error.message,
      type: 'error'
    })
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

    showMessage({
      message: response.message,
      type: 'success'
    })

    return true

  } catch (error) {
    showMessage({
      message: error.message,
      type: 'error'
    })
    return false
  }
}

const deleteCar = async (plate) => {
  try {
    const response = await request({
      url: baseURL,
      method: 'DELETE',
      data: { plate }
    })

    showMessage({
      message: response.message,
      type: 'success'
    })

    getCars()
  } catch (error) {
    showMessage({
      message: error.message,
      type: 'error'
    })
  }
}

form.addEventListener("submit", async (event) => {
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
  const isRegistered = await registerNewCar(newCar)
  if (isRegistered) {
    event.target.reset()
    event.target.querySelector('#image').focus()
  }
})

getCars()
