const count = factorCount;
const xPadding = 0.2;
const xGap = 0.2;
const yTop = 0.6;
const yBottom = 0.9;

class FactorBar {

    constructor(index) {

        this.index = index;
        
        this.state = 50;

    }

    ApplyEffect(effect) {

        this.state += Number(effect);
       
        if ( this.state > 100 ) { this.state = 100 }
        if ( this.state < 0 ) { this.state = 0 }

    }
    
    Draw() {
        
        push();
        
        const eachWidth = width * (1 - 2*xPadding) / count;
        const left = width * xPadding + this.index * eachWidth + ( eachWidth * xGap/2 );
        const right = width * xPadding + ( this.index + 1 ) * eachWidth - (eachWidth * xGap/2);
        const bgTop = height * yTop;
        const top = height * (yBottom - (yBottom - yTop) * this.state/100);
        const bottom = height * yBottom;
        
        rectMode(CORNERS);
        noStroke();
        fill(100,100,200,255);
        rect(left, bgTop, right, bottom, width * 0.02);
        fill('#00cccc');
        rect(left, top, right, bottom, width * 0.02);

        pop();

    }

}