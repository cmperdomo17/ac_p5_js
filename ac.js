import p5 from 'p5';

let sketch = new p5((p) => {
    //Variables para implementación con píxeles:
    // let canvasHeight = 70;
    // let canvasWidth = 70;

    //Variables para la implementación con grilla:
    let width = 400;
    let height = 400;
    let cols; let rows;
    let size = 20;
    

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
        //Implementación con pixeles:
        //p.createCanvas(canvasWidth, canvasHeight);
        //p.background(255);

        //Implementación con grilla:
        p.createCanvas(width, height);
        p.frameRate(10);
        //p.noLoop();
        p.noStroke();
        p.background(220);
        cols = width/size;
        rows = height/size;
    }

    //Función para generar las primeras 3 lineas de la grilla con colores aleatorios
    const threeLines = (numFil) => {
        for (let i = 0; i < cols; i++) {
            for (let j = rows-1; j >= rows-numFil; j--) {
                p.fill(p.random(255), p.random(255), p.random(255));
                p.rect(i*size, j*size, size, size);
            }     
        }
        return numFil-1;
    }

    //Función para generar las primeras 3 lineas de la grilla con colores aleatorios (gama de naranjas o negros)
    const threeLinesPlus = (numFil) => {
        for (let i = 0; i < cols; i++) {
            for (let j = rows-1; j >= rows-numFil; j--) {
                if (p.random() < 0.1) { // 10% de posibilidad de ser negro
                    p.fill(0, 0, 0);
                } else { // 90% de posibilidad de ser naranja
                    p.fill(p.random(156, 255), p.random(87, 135), 0);
                }
                p.rect(i*size, j*size, size, size);
            }     
        }
        return numFil-1;
    }

    // Función para generar nuevas lineas en la grilla según la vecindad de Newman y el promedios (gama de naranjas o negros)
    const newman = (numFil) => {
        for(let i = 0; i < cols; i++) {
            let colorLeft = p.get((((i-1)*size)+width)%width+1, (rows-numFil)*size+1);

            let colorRight = p.get((((i+1)*size)+width)%width+1, (rows-numFil)*size+1);

            let colorUp = p.get((((i)*size)+width)%width+1, (((rows-numFil)+1)*size+height)%height+1);

            let colorDown = p.get((((i)*size)+width)%width+1, (((rows-numFil)-1)*size+height)%height+1);

            let averageColor = [

            (colorUp[0] + colorDown[0] + colorLeft[0] + colorRight[0]) / 4, 
            
            (colorUp[1] + colorDown[1] + colorLeft[1] + colorRight[1]) / 4,
            
            (colorUp[2] + colorDown[2] + colorLeft[2] + colorRight[2]) / 4
            
            ];

            p.fill(averageColor);
            p.rect(i*size, (rows-numFil-2)*size, size, size);     
        }

        return numFil+1;
    }

    p.draw = () => {
        //Dibujando la implementación con píxeles (gama de naranjas o negros)
        // drawRandomLines();
        // drawAverageLines();
        // p.updatePixels();


        //Dibujando la implementación con grilla:
        let nFil = 3;
        nFil = threeLines(nFil);
        //nFil = threeLinesPlus(nFil); //Newmann con gama de naranjas y negros
        while (nFil<rows) {
            nFil = newman(nFil);
        }
    }
})

export default sketch; 