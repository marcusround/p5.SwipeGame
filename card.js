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


class CardUI {

    constructor(card) {

        this.card = card;

    }

    Draw() {

        push();
        
        translate(this.position.x, this.position.y);

        const rot = this._swipePosition * Math.PI * 0.06;
        rotate(this.rotation);
        
        rectMode(CENTER);
        
        noStroke();
        fill(palette['ui']);
        rect(0,0, this.width, this.height, width * 0.02);
        
        fill(palette['black']);
        textAlign(CENTER, CENTER);
        text(this.text, 0,0, this.width * 0.9, this.height * 0.9);
        
        pop();

    }

    MoveTowardsTarget(speed = 0.15) {

        this.position.x += speed * this.target.x - this.position.x;
        this.position.y += speed * this.target.y - this.position.y;
        this.rotation += speed * this.target.rotation - this.rotation;
        
    }

    SetTarget(targetName) {

        switch (swipeState) {

            case 'previewYes':
                this.target.x = width * 0.75;
                this.target.y = height * 0.44;
                this.target.rotation = Math.PI * 0.25;
                break;
            
            case 'previewNo':
                this.target.x = width * 0.75;
                this.target.y = height * 0.44;
                this.target.rotation = -Math.PI * 0.25;
                break;

            default:
                this.target.x = width * 0.5;
                this.target.y = height * 0.33;
                this.rotation = 0;
                break;
            
        }
        
    }

    Update() {

        this.MoveTowardsTarget();
        
    }


}