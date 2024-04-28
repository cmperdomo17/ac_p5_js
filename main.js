import './style.css'
import javascriptLogo from './javascript.svg'
import p5 from 'p5'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1> Automatas Celulares with </h1>
    <img id="logo_js" src="${javascriptLogo}" alt="JavaScript Logo" />
    <div id="app"></div>
  </div>
`

new p5((sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
    sketch.background(0);
  }

  sketch.draw = () => {
    sketch.fill(255);
    sketch.ellipse(sketch.width / 2, sketch.height / 2, 50, 50);
  }
}, 'app');



