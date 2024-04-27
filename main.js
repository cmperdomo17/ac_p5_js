import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1> Automatas Celulares with </h1>
    <img id="logo_js" src="${javascriptLogo}" alt="JavaScript Logo" />
  </div>
`

setupCounter(document.querySelector('#counter'))
