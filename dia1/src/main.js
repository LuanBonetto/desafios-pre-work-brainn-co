const divApp = document.querySelector('.app')
let isVisible = true

const insertContent = () => {
  divApp.innerHTML = `
    <h1>B. Academy</h1>
    <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
  `
}

const removeContent = () => {
  while(divApp.firstChild){
    divApp.removeChild(divApp.firstChild)
  }
}

const setButtonVisibilityText = () => {
  const buttonVisibility = document.querySelector('.button-visibility')
  if(isVisible){
    buttonVisibility.textContent = 'Clique aqui para ocultar!'
  } else {
    buttonVisibility.textContent = 'Clique aqui para exibir!'
  }
}

const setVisibility = () => {
  isVisible = !isVisible
  isVisible ? insertContent() : removeContent()
  setButtonVisibilityText()
}

isVisible && insertContent()

divApp.insertAdjacentHTML('afterend', `
  <a class="button-visibility" onclick={setVisibility()}>Clique aqui para ocultar!</a>
`)
