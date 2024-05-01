import p5 from 'p5';

let sketch = new p5((p) => {

    let canvasHeight = 70;
    let canvasWidth = 70;

    //Función para dibujar las 3 primeras lineas para la implementación con píxeles (gama de naranjas o negros)
    const drawRandomLines = () => {
        // Dibujar tres lineas abajo del canvas con pixeles aleatorios en gama de naranja o negros
        for (let i = 0; i < 3; i++) {
            for (let x = 0; x < canvasWidth; x++) {
                let y = canvasHeight - i - 1; 
                if (p.random() < 0.1) { // 10% de posibilidad de ser negro
                    p.stroke(0, 0, 0);
                } else { // 90% de posibilidad de ser naranja
                    p.stroke(p.random(156, 255), p.random(87, 135), 0);
                }
                p.point(x, y); 
            }
        }
    }

    //Función para calculas los promedios y generar nuevas filas teniendo en cuenta la vecindad de Newmann (gama de naranjas o negros)
    const drawAverageLines = () => {
        // Repetir el proceso para cada línea desde la parte inferior hasta la parte superior del lienzo
        for (let i = 2; i < canvasHeight; i++) {
            for (let x = 0; x < canvasWidth; x++) {
                let y = canvasHeight - i; 
                let colorUp = p.get(x, (y - 1 + canvasHeight) % canvasHeight);
                let colorDown = p.get(x, (y + 1) % canvasHeight);
                let colorLeft = p.get((x - 1 + canvasWidth) % canvasWidth, y);
                let colorRight = p.get((x + 1) % canvasWidth, y);
                let averageColor = [
                    (colorUp[0] + colorDown[0] + colorLeft[0] + colorRight[0]) / 4,
                    (colorUp[1] + colorDown[1] + colorLeft[1] + colorRight[1]) / 4,
                    (colorUp[2] + colorDown[2] + colorLeft[2] + colorRight[2]) / 4
                ];
                p.stroke(averageColor);
                p.point(x, y - 1); // Dibuja el valor promedio en la línea anterior
            }
        }
    }

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(255);
    }

    p.draw = () => {
        drawRandomLines();
        drawAverageLines();
        p.updatePixels();
    }
})