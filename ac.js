import p5 from 'p5';

let sketch = new p5((p) => {
    let canvasHeight =  500;
    let canvasWidth = 500;

    let cols; let rows;
    let size = 20;


    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        cols = canvasHeight/size;
        rows = canvasWidth/size;
    }

    p.draw = () => {
        p.background(220);
        for (let i=0; i<cols; i++) {
            for(let j=0; j<rows; j++) {
                p.rect(i*size, j*size, size, size);
            }
        }
    }
})

export default sketch;