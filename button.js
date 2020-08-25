class Button {

    constructor ( p ) {

        this.x = p.x || 0;
        this.y = p.y || 0;
        this.radius = p.radius || 40;

        this.colour = p.colour || 'white';

        this.clickEffect = p.clickEffect;
        
    }

    Click () {

        if (this.clickEffect) {
            this.clickEffect()
        }
        
    }

    IsWithinRange ( x, y ) {

        return dist(x, y, this.x, this.y) < this.radius;
        
    }

    Draw () {
        push();

        noStroke();
        ellipseMode(RADIUS);
        fill(this.colour);

        ellipse(this.x, this.y, this.radius, this.radius);
                
        pop();
    }

}