import p5 from 'p5';

let sketch = new p5((p) => {

    let canvasHeight = 256;
    let canvasWidth = 256;
    let fps = 0;

    // Paleta de colores para el fuego (de 0 a 255) (de blanco a negro)
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
    let firePixels = [];
    let buffer; 

    p.setup = () => {
        p.createCanvas(canvasWidth * 2, canvasHeight * 2);
        let i = 0;
        buffer = p.createGraphics(canvasWidth, canvasHeight);

        // Llena todo el lienzo con 0 (negro)
        for (let i = 0; i < canvasWidth * canvasHeight; i++) {
            firePixels[i] = 0;
        }
        // Llena la primera fila de blanco
        for (let i = 0; i < canvasWidth; i++) {
            firePixels[(canvasHeight - 1) * canvasWidth + i] = firePalette.length - 1;
        }
    }

    p.draw = () => {
        p.background(0);
        doFire();
        buffer.loadPixels();
        // Renderiza cada pixel de la paleta en el buffer
        for (let h = 0; h < canvasHeight; h++) {
            for (let w = 0; w < canvasWidth; w++) {
                let pixelValue = firePixels[h * canvasWidth + w];
                buffer.set(w, h, p.color(firePalette[pixelValue]));
            }
        }
        buffer.updatePixels();
        p.image(buffer, 0, 0, canvasWidth * 2, canvasHeight * 2);
        fps = p.frameRate();
        p.fill(255);
        p.stroke(0);
        p.textSize(16);
        p.text("FPS: " + fps.toFixed(2), 20, canvasHeight/6 - 10);
    }

    const spreadFire = (pixel, curSrc, count, srcOffset, rand, canvasWidth) => {
        if (pixel != 0) {
            let randIdx = Math.round(Math.random() * 255.0) & 255;
            let tmpSrc;

            rand = (rand + 2) & 255;
            tmpSrc = curSrc + ((count - (randIdx & 3) + 1) & (canvasWidth - 1));
            firePixels[tmpSrc - canvasWidth] = pixel - (randIdx & 1);
        } else {
            firePixels[srcOffset - canvasWidth] = 0;
        }
        return rand;
    }

    const doFire = () => {

        let count = 0;
        let curSrc = 0;
        let srcOffset = 0;
        let rand = 0;
        let step = 0;
        let pixel = 0;
        rand = (Math.random() * 255.0) | 0;
        curSrc = canvasWidth;

        do {
            srcOffset = curSrc + count;
            pixel = firePixels[srcOffset];
            step = 2;

            rand = spreadFire(pixel, curSrc, count, srcOffset, rand, canvasWidth);

            curSrc += canvasWidth;
            srcOffset += canvasWidth;

            do {
                pixel = firePixels[srcOffset];
                step += 2;

                rand = spreadFire(
                    pixel,
                    curSrc,
                    count,
                    srcOffset,
                    rand,
                    canvasWidth
                );

                pixel = firePixels[srcOffset + canvasWidth];
                curSrc += canvasWidth;
                srcOffset += canvasWidth;

                rand = spreadFire(
                    pixel,
                    curSrc,
                    count,
                    srcOffset,
                    rand,
                    canvasWidth
                );

                curSrc += canvasWidth;
                srcOffset += canvasWidth;
            } while (step < canvasHeight);

            count++;
            curSrc -= canvasWidth * canvasHeight - canvasWidth;
        
        } while (count < canvasWidth);
    }

});

export default sketch;