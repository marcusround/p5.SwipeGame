class Card {

    constructor() {

        this.x = width * 0.5;
        this.y = height * 0.33;

        this.width = width * 0.56;
        this.height = height * 0.44;

        this._swipePosition = 0;

        this._effects = {};

        this.SetSwipeState(0);

    }

    Draw() {

        push();
        
        const xPos = this.x + this._swipePosition * width/4;
        translate(xPos, this.y);

        const rot = this._swipePosition * Math.PI * 0.06;
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

    EvaluateMousePress(x,y) {

        if ( this.IsUnderneathPoint(x,y) ) {

            this.PickUp();
            
        }
        
    }

    EvaluateMouseReleased(x,y) {

        this.PutDown();
        
    }

    GetEffects(effectsType, effectsName = null) {

        // eg.
        //    effectsType = 'swipeYes', 'swipeNo'
        //     effectName = 'Budget', 'Impressions'

        if ( effectsName ) {
            return this._effects[effectsType][effectsName];
        } else {
            return this._effects[effectsType];
        }
        
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

    SetEffects(effectsType, effects) {

        // eg.
        //   effectsType = 'swipeYes'
        //       effects = { 'Budget': -10, 'Impressions': +4 }

        this._effects[effectsType] = effects;
        
    }

    SetSwipeState(swipeState) {

        this._swipeTarget = swipeState;
        
    }
    
    Update() {

        this._swipePosition += 0.06 * (this._swipeTarget - this._swipePosition);
        console.log(this._swipePosition);
        
    }

}
