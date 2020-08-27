class Card {

    constructor() {

        this.x = width * 0.5;
        this.y = height * 0.33;

        this.width = width * 0.56;
        this.height = height * 0.44;

    }

    Draw() {

        push();

        rectMode(CENTER);
        
        noStroke();
        fill(palette['ui']);
        rect(this.x, this.y, this.width, this.height, width * 0.02);
        
        fill(palette['black']);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y, this.width * 0.9, this.height * 0.9);
        
        pop();

    }

}