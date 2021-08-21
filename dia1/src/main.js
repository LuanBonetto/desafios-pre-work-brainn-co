import './style.css'

const divApp = document.querySelector('[data-js="app"]')
let isVisible = true

divApp.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

divApp.insertAdjacentHTML('afterend', `
    <a href="#" class="button-visibility" data-js="link">Clique aqui para ocultar!</a>
`)

const link = document.querySelector('[data-js="link"]')

link.addEventListener('click', (event) => {
  event.preventDefault()

  isVisible = !isVisible
  link.textContent = isVisible ? 'Clique aqui para ocultar!' : 'Clique aqui para exibir!'
  divApp.style.display = isVisible ? 'block' : 'none'
})
