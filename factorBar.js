const count = factorCount;
const xPadding = 0.2;
const xGap = 0.2;
const yTop = 0.6;
const yBottom = 0.9;

class Factor {

  constructor(p) {

    this.name = p.name;
    this.state = p.initialState || 50;

  }

  ApplyEffect(effect) {

    this.state += Number(effect);

    if (this.state > 100) { this.state = 100 }
    if (this.state < 0) { this.state = 0 }

  }

}

class FactorBar {

  constructor(p) {

    this.index = p.index;
    this.factor = p.factor;
    this.previewMode = p.previewMode || 'NONE';
    
    this.tooltip = new Tooltip({'text': this.factor.name});

    this.Resize();

  }

  EvaluateMousePosition(x, y) {
    
    const isUnderneathMouse = boolean(
      x < this.right &&
      x > this.left &&
      y < this.bottom &&
      y > this.bgTop
    )

    if (isUnderneathMouse) {

      this.highlighted = true;
      
    } else {

      this.highlighted = false;
      
    }

  }

  Resize() {

    const eachWidth = width * (1 - 2 * xPadding) / count;
    this.left = width * xPadding + this.index * eachWidth + (eachWidth * xGap / 2);
    this.right = width * xPadding + (this.index + 1) * eachWidth - (eachWidth * xGap / 2);
    this.bgTop = height * yTop;
    this.bottom = height * yBottom;
    this.rounding = width * 0.02;
    
  }

  SetPreview(amount) {

    this.preview = Number(amount);

  }

  SetPreviewMode(string) {

    // 'FULL', 'PARTIAL', 'ALL' or 'NONE'
    // Anything else is equivalent to 'NONE'

    this.previewMode = string;
    
  }

  Draw() {

    const fullPreview = Boolean( this.previewMode === 'FULL' || this.previewMode === 'ALL' );
    const hintPreview = Boolean( this.previewMode === 'HINT' || this.previewMode === 'ALL' );

    if ( fullPreview && this.preview ) {
    
      this.top = height * (yBottom - (yBottom - yTop) * (this.factor.state + this.preview) / 100);
    
    } else {
    
      this.top = height * (yBottom - (yBottom - yTop) * this.factor.state / 100);
    
    }

    push();

    rectMode(CORNERS);
    ellipseMode(CENTER);
    noStroke();

    const drawBGRect = () => {
      rect(this.left, this.bgTop, this.right, this.bottom, this.rounding);
    }
    
    fill(palette['background-2']);
    drawBGRect();

    fill(palette['foreground']);
    rect(this.left, this.top, this.right, this.bottom, this.rounding);
    
    if (this.highlighted) {
      
      noFill();
      stroke(palette['highlight']);
      strokeWeight(6);
      
      drawBGRect();

      fill(palette['ui']);
      noStroke();

      this.tooltip.Draw(mouseX + 10, this.bottom + 10);
      
    }

    if ( hintPreview && this.preview ) {

      const r = ( this.preview < 10 ? 15 : 30 )

      fill(palette['background-2']);
      ellipse((this.left + this.right) / 2, this.bottom + 20, r, r);
      
    }

    pop();

  }

}

class Tooltip {

  constructor(p) {

    this.text = p.text;
    this.relativeTextSize = p.relativeTextSize || 0.025;
    this.padding = p.padding || 0.05;

    this.Resize();

  }

  Resize(newRelativeTextSize) {

    push();

    this._textSize = height * (newRelativeTextSize || this.relativeTextSize);
    textSize(this._textSize);

    this._padding = width * this.padding;

    this.width = textWidth(this.text) + this._padding * 2;
    this.height = this._textSize + this._padding * 2;
    this.rounding = width * 0.02;

    pop();
    
  }

  Draw(x, y) {

    push();

    noStroke();
    fill(palette['ui']);
    rectMode(CORNER);
    rect(x, y, this.width, this.height, this.rounding);
    
    fill(palette['black']);
    textSize(this._textSize);
    text(this.text, x + this._padding, y + this._textSize + this._padding)
    
    pop();

  }
  
}