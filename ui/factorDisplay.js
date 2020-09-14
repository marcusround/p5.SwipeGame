const xPadding = 0.2;
const xGap = 0.2;
const yTop = 0.6;
const yBottom = 0.9;

class FactorBar {

  constructor(p) {

    this.factor = p.factor;
    this.previewMode = p.previewMode || 'NONE';

    this.tooltip = new Tooltip({ 'text': this.factor.name });

  }

  evaluateMousePosition(x, y) {

    const isUnderneathMouse = boolean(
      x < this.right &&
      x > this.left &&
      y < this.bottom &&
      y > this.top
    )

    if (isUnderneathMouse) {

      this.highlighted = true;

    } else {

      this.highlighted = false;

    }

  }

  setPreviewMode(string) {

    // 'FULL', 'PARTIAL', 'ALL' or 'NONE'
    // Anything else is equivalent to 'NONE'

    this.previewMode = string;

  }


  draw() {

    const fullPreview = Boolean(this.previewMode === 'FULL' || this.previewMode === 'ALL');
    const hintPreview = Boolean(this.previewMode === 'HINT' || this.previewMode === 'ALL');

    const displayState = fullPreview ? this.factor.state + this.factor.preview : this.factor.state;
    
    const displayLevel = this.bottom - (this.bottom - this.top) * displayState / 100;   

    push();

    rectMode(CORNERS);
    ellipseMode(CENTER);
    noStroke();

    const drawBGRect = () => {
      rect(this.left, this.top, this.right, this.bottom, this.rounding);
    }

    fill(palette['background-2']);
    drawBGRect();

    fill(palette['foreground']);
    rect(this.left, displayLevel, this.right, this.bottom, this.rounding);

    if (this.highlighted) {

      noFill();
      stroke(palette['highlight']);
      strokeWeight(4);

      drawBGRect();

      fill(palette['ui']);
      noStroke();

      this.tooltip.draw(mouseX + 10, this.bottom + 10);

    }

    if (hintPreview && this.factor.preview && this.factor.preview !== 0) {

      const r = ( Math.abs(this.factor.preview) < 10 ? 15 : 30)

      fill(palette['background-2']);
      ellipse((this.left + this.right) / 2, this.bottom + 20, r, r);

    }

    pop();

  }

}

class FactorDisplay {

  constructor(factorManager, relativeSizes) {

    this.factorManager = factorManager;
    this.factorManager.factorListeners.push(x => this.onSetFactors(x));
    this.bars = [];

    this.resize(relativeSizes);

  }

  evaluateMousePosition(x, y) {

    this.bars.forEach(bar => bar.evaluateMousePosition(x, y));

  }

  onSetFactors(factors) {
    
    this.bars = [];
    
    factors.forEach(factor => {
      this.bars.push(
        new FactorBar(
          {
            'factor': factor,
            'previewMode': settings.previewMode,
          }
        )
      )
    });

    this.resize();
    
  }

  resize(p) {

    // Resize relative to canvas

    if (p) {
      this.relativeX = p.x || this.relativeX;
      this.relativeY = p.y || this.relativeY;
      this.relativeWidth = p.width || this.relativeWidth;
      this.relativeHeight = p.height || this.relativeHeight;
      this.relativeRounding = p.rounding || this.relativeRounding;
      this.padding = p.padding || this.padding || 0;
    }

    const absoluteMeasurements = {
      'x': width * this.relativeX,
      'y': height * this.relativeY,
      'width': width * this.relativeWidth,
      'height': height * this.relativeHeight,
      'rounding': width * this.relativeRounding,
      'padding': this.padding, // Padding is always relative to each bar, eg 0.1
    }

    this.resizeAbsolute(absoluteMeasurements);

  }

  resizeAbsolute(p) {

    // Set absolute display parameters
    if (this.bars.length == 0) { return; }

    this.x = p.x || this.x;
    this.y = p.y || this.y;
    this.width = p.width || this.width;
    this.height = p.height || this.height;
    this.rounding = p.rounding || this.rounding;

    const farLeft = this.x - this.width / 2;
    const top = this.y - this.height / 2;
    const bottom = this.y + this.height / 2;
    const eachWidth = this.width / this.bars.length;

    this.bars.forEach((bar, index) => {

      bar.left = farLeft + (index + this.padding) * eachWidth;
      bar.right = farLeft + (index + 1 - this.padding) * eachWidth;
      bar.top = top;
      bar.bottom = bottom;
      bar.rounding = this.rounding;

    });

  }

  draw() {

    this.bars.forEach(bar => {
      bar.draw();
    });

  }
}

class Tooltip {

  constructor(p) {

    this.text = p.text;
    this.relativeTextSize = p.relativeTextSize || 0.025;
    this.padding = p.padding || 0.05;

    this.resize();

  }

  resize(newRelativeTextSize) {

    push();

    this._textSize = height * (newRelativeTextSize || this.relativeTextSize);
    textSize(this._textSize);

    this._padding = width * this.padding;

    this.width = textWidth(this.text) + this._padding * 2;
    this.height = this._textSize + this._padding * 2;
    this.rounding = width * 0.02;

    pop();

  }

  draw(x, y) {

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