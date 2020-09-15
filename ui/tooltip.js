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