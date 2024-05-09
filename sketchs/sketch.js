import p5 from 'p5';

let sketch = new p5((p) => {

    //Las dimensiones tienen que ser un exponente de 2
    let canvasHeight = 256;
    let canvasWidth = 256;
    let fps = 0;

    // Paleta de colores para el fuego (de blanco a negro)
    let firePalette = [
        p.color(7,7,7),
        p.color(31,7,7),
        p.color(47, 15,7),
        p.color(71, 15,7),
        p.color(87, 23,7),
        p.color(103, 31,7),
        p.color(119, 31,7),
        p.color(143, 39,7),
        p.color(159, 47,7),
        p.color(175, 63,7),
        p.color(191, 71,7),
        p.color(199, 71,7),
        p.color(223, 79,7),
        p.color(223, 87,7),
        p.color(223, 87,7),
        p.color(215, 95,7),
        p.color(215, 95,7),
        p.color(215, 103,15),
        p.color(207, 111,15),
        p.color(207, 119,15),
        p.color(207, 127,15),
        p.color(207, 135,23),
        p.color(199, 135,23),
        p.color(199, 143,23),
        p.color(199, 151,31),
        p.color(191, 159,31),
        p.color(191, 159,31),
        p.color(191, 167,39),
        p.color(191, 167,39),
        p.color(191, 175,47),
        p.color(183, 175,47),
        p.color(183, 183,47),
        p.color(183, 183,55),
        p.color(207, 207,111),
        p.color(223, 223,159),
        p.color(239, 239,199),
        p.color(255, 255,255)
    ];
    let board = [];
    let buffer; 

    p.setup = () => {
        p.createCanvas(canvasWidth * 2, canvasHeight * 2);
        let i = 0;
        buffer = p.createGraphics(canvasWidth, canvasHeight);

        // Llena todo el lienzo con 0 (negro)
        for (let i = 0; i < canvasWidth * canvasHeight; i++) {
            board[i] = 0;
        }
        // Llena la primera fila de abajo de blanco
        for (let i = 0; i < canvasWidth; i++) {
            board[(canvasHeight - 1) * canvasWidth + i] = firePalette.length - 1;
        }
    }

    p.draw = () => {
        p.background(0);
        doFire();
        buffer.loadPixels();
        // Asigna al buffer el color de cada pixel en su respectiva posicion
        let w;
        let pixelColor;
        for (let h = 0; h < canvasHeight; h++) {
            for (w = 0; w < canvasWidth; w++) {
                pixelColor = board[h * canvasWidth + w];
                buffer.set(w, h, p.color(firePalette[pixelColor]));
            }
        }
        //Actualiza los pixeles
        buffer.updatePixels();
        p.image(buffer, 0, 0, canvasWidth * 2, canvasHeight * 2);
        fps = p.frameRate();
        //Imprime en pantalla los fps
        p.fill(255);
        p.stroke(0);
        p.textSize(16);
        p.text("FPS: " + fps.toFixed(2), 20, canvasHeight/6 - 10);
    }

    const spreadFire = (pixel, actualRow, actualColumn, pixelIndex) => {
        //Si el color del píxel no es negro
        if (pixel !== 0) {
          //Genera un numero al azar entre 0 y 3
          let rand = Math.round(Math.random() * 2.0);
          //Calcula el indice del pixel en la fila de arriba, en alguna de las 3 direcciones
          //segun el numero aleatorio.
          // 0: En el pixel arriba a la derecha
          // 1: En el pixel inmediatamente arriba
          // 2: En el pixel arriba a la izquierda
          let upPixel = (actualRow + actualColumn) - canvasWidth - rand + 1;
          //Dependiendo del numero aleatorio generado se le da un color al pixel de arriba:
          // 0 o 2: el mismo color del pixel actual
          // 1: un color mas oscuro
          board[upPixel] = board[actualRow + actualColumn] - (rand % 2);
        } else {
          //Si el color del píxel es negro, el píxel de arriba también se vuelve negro
          board[pixelIndex - canvasWidth] = 0;
        }
      };

    const doFire = () => {

        let actualColumn = 0; 
        let actualRow = 0;
        let pixelIndex = 0;
        let step = 0;
        let pixel = 0;
        //Los primeros 256 (canvasWidth) elementos del board son los pixeles blancos, es decir la 1er fila
        //entonces se salta a la 2da fila
        actualRow = canvasWidth;
        do {
            //Recorre el tablero
            pixelIndex = actualRow + actualColumn;
            pixel = board[pixelIndex];

            step = 2;
            //Propaga los colores de fuego
            spreadFire(pixel, actualRow, actualColumn, pixelIndex, canvasWidth);
            //Salta a la fila de arriba
            actualRow += canvasWidth;
            pixelIndex += canvasWidth;

            do {
                //Obtiene el color del pixel en la posicion actual
                pixel = board[pixelIndex];
                //El paso va de 2 en 2 porque en una iteracion se hace dos veces el spreadFire
                step += 2;
                //Se propaga el fuego a la fila de arriba
                spreadFire(
                    pixel,
                    actualRow,
                    actualColumn,
                    pixelIndex
                );

                pixel = board[pixelIndex + canvasWidth];
                //Salta a la fila de arriba
                actualRow += canvasWidth;
                pixelIndex += canvasWidth;

                //Nuevamente se propaga el fuego a la fila de arriba
                spreadFire(
                    pixel,
                    actualRow,
                    actualColumn,
                    pixelIndex
                );

                //Salta a la fila de arriba
                actualRow += canvasWidth;
                pixelIndex += canvasWidth;
            } while (step < canvasHeight);

            //Se pasa a la siguiente columna
            actualColumn++;
            //Se devuelve a la primera fila de abajo
            actualRow -= canvasWidth * canvasHeight - canvasWidth;
        
        } while (actualColumn < canvasWidth);
    }

});

export default sketch;