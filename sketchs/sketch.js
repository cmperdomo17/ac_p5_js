import p5 from 'p5';

let sketch = new p5((p) => {

    let canvasHeight = 256;
    let canvasWidth = 256;
    let fps = 0;

    let firePalette = [];
    let firePixels = [];
    let buffer;
    let fireRGB = [
        0x07, 0x07, 0x07, 0x1F, 0x07, 0x07, 0x2F, 0x0F, 0x07, 0x47, 0x0F, 0x07, 0x57, 0x17, 0x07, 0x67,
        0x1F, 0x07, 0x77, 0x1F, 0x07, 0x8F, 0x27, 0x07, 0x9F, 0x2F, 0x07, 0xAF, 0x3F, 0x07, 0xBF, 0x47,
        0x07, 0xC7, 0x47, 0x07, 0xDF, 0x4F, 0x07, 0xDF, 0x57, 0x07, 0xDF, 0x57, 0x07, 0xD7, 0x5F, 0x07,
        0xD7, 0x5F, 0x07, 0xD7, 0x67, 0x0F, 0xCF, 0x6F, 0x0F, 0xCF, 0x77, 0x0F, 0xCF, 0x7F, 0x0F, 0xCF,
        0x87, 0x17, 0xC7, 0x87, 0x17, 0xC7, 0x8F, 0x17, 0xC7, 0x97, 0x1F, 0xBF, 0x9F, 0x1F, 0xBF, 0x9F,
        0x1F, 0xBF, 0xA7, 0x27, 0xBF, 0xA7, 0x27, 0xBF, 0xAF, 0x2F, 0xB7, 0xAF, 0x2F, 0xB7, 0xB7, 0x2F,
        0xB7, 0xB7, 0x37, 0xCF, 0xCF, 0x6F, 0xDF, 0xDF, 0x9F, 0xEF, 0xEF, 0xC7, 0xFF, 0xFF, 0xFF
    ];

    p.setup = () => {
        p.createCanvas(canvasWidth * 2, canvasHeight * 2);
        let i = 0;
        buffer = p.createGraphics(canvasWidth, canvasHeight);
        let palIndex = 0;
        while (palIndex < 37) {
            firePalette[palIndex++] = {
                r: fireRGB[i++],
                g: fireRGB[i++],
                b: fireRGB[i++]
            };
        }

        for (let i = 0; i < canvasWidth * canvasHeight; i++) {
            firePixels[i] = 0;
        }

        for (let i = 0; i < canvasWidth; i++) {
            firePixels[(canvasHeight - 1) * canvasWidth + i] = 36;
        }
    }

    p.draw = () => {
        p.background(0);
        doFire();
        buffer.loadPixels();
        for (let h = 0; h < canvasHeight; h++) {
            for (let w = 0; w < canvasWidth; w++) {
                let pixelValue = firePixels[h * canvasWidth + w];
                buffer.set(w, h, p.color(firePalette[pixelValue].r, firePalette[pixelValue].g, firePalette[pixelValue].b));
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