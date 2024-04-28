import p5 from 'p5';

let sketch = new p5((p) => {
    let canvasHeight = 600;
    let canvasWidth = 600;

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(255);
    }

    p.draw = () => {
        // Rellenar el canvas con pixeles aleatorios

        // for (let c = 0; c < canvasWidth; c++) {
        //     for (let f = 0; f < canvasHeight; f++) {
        //         let pix = p.color(p.random(255), p.random(255), p.random(255));
        //         p.set(c, f, pix);
        //     }
        // }

        // Dibujar tres lineas abajo del canvas con pixeles aleatorios
        for (let i = 0; i < 3; i++) {
            for (let x = 0; x < canvasWidth; x++) {
                let y = canvasHeight - i - 1; 
                p.stroke(p.random(255), p.random(255), p.random(255)); 
                p.point(x, y); 
            }
        }
        p.updatePixels();
    }
})

export default sketch;