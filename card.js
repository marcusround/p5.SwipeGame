class Card {

    constructor() {

        this.x = width * 0.5;
        this.y = height * 0.33;

        this.width = width * 0.56;
        this.height = height * 0.44;

        this.isHeld = false;
        this.swipePosition = 0;

    }

    Draw() {

        push();
        
        const xPos = this.x + this.swipePosition * width/4;
        translate(xPos, this.y);

        const rot = this.swipePosition * Math.PI * 0.06;
        rotate(rot);
        
        rectMode(CENTER);
        
        noStroke();
        fill(palette['ui']);
        rect(0,0, this.width, this.height, width * 0.02);
        
        fill(palette['black']);
        textAlign(CENTER, CENTER);
        text(this.text, 0,0, this.width * 0.9, this.height * 0.9);
        
        pop();

    }

    EvaluateMousePosition(x,y) {

        if ( this.isHeld === true ) {

            this.swipePosition = sineWaveMap(x / width, { 'mapMin': -Math.PI/2, 'mapMax': Math.PI/2 });

        }
        
    }
    
    EvaluateMousePress(x,y) {

        if ( this.IsUnderneathPoint(x,y) ) {

            this.PickUp();
            
        }
        
    }

    EvaluateMouseReleased(x,y) {

        this.PutDown();
        
    }

    IsUnderneathPoint(x,y) {

        return Boolean(
            x < this.x + this.width/2 &&
            x > this.x - this.width/2 &&
            y < this.y + this.height/2 &&
            y > this.y - this.height/2
        )
        
    }

    PickUp() {

        this.isHeld = true;
        
    }

    PutDown() {

        this.isHeld = false;

    }
    
    Update() {

        if ( !this.isHeld ) {

            this.swipePosition *= 0.74;

            if (this.swipePosition < 0.01) {
                this.swipePosition = 0;
            }
            
        }
        
    }

}