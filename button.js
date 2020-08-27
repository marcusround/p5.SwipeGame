class Button {

    constructor ( p ) {

        this.id = p.id;

        this.x = p.x || 0;
        this.y = p.y || 0;
        this.radius = p.radius || 40;

        this.colour = p.colour || 'white';

        this.OnClick = p.OnClick;
        this.OnHover = p.OnHover;
        this.OnHoverExit = p.OnHoverExit;
        this.hoverState = false;
        
    }

    EvaluateMousePress ( x, y ) {

        if (this.OnClick && this.IsUnderneathPoint(x,y)) {
            this.OnClick();
        }
        
    }

    EvaluateMousePosition ( x, y ) {

        if ( this.IsUnderneathPoint( x, y ) ) {

            if ( this.hoverState === false ) {

                this.hoverState = true;
                if (this.OnHover) {
                    this.OnHover();
                }
                
            }

        } else {

            if ( this.hoverState === true ) {

                this.hoverState = false;
                if (this.OnHoverExit) {
                    this.OnHoverExit();
                }

            }

        }
        
    }

    IsUnderneathPoint ( x, y ) {

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