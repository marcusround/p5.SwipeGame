class Card {

  constructor() {

    this._swipePosition = 0;

    this._effects = {};
    
  }
  
  getEffects(effectsType, effectsName = null) {
    
    // eg.
    //    effectsType = 'swipeYes', 'swipeNo'
    //     effectName = 'Budget', 'Impressions'
    
    if (effectsName) {
      return this._effects[effectsType][effectsName];
    } else {
      return this._effects[effectsType];
    }
    
  }
  
  setEffects(effectsType, effects) {
    
    // eg.
    //   effectsType = 'swipeYes'
    //       effects = { 'Budget': -10, 'Impressions': +4 }
    
    this._effects[effectsType] = effects;
    
  }
  
}

class CardUI {
  
  constructor(card) {
    
    this.changeCard(card);

    this.positions = {

      'previewYes': {
        'x': width * 0.7,
        'y': height * 0.35,
        'r': Math.PI * 0.06,
      },
    
      'previewNo': {
        'x': width * 0.3,
        'y': height * 0.35,
        'r': -Math.PI * 0.06,
      },
    
      'center': {
        'x': width * 0.5,
        'y': height * 0.33,
        'r': 0,
      },
    
      'start': {
        'x': width * 0.4,
        'y': height * -0.33,
        'r': -Math.PI * 0.2,
      },
    
      'swipeYes': { 
        'x': width * 1.55,
        'y': height * 0.5,
        'r': Math.PI * 0.12,
      },
    
      'swipeNo': { 
        'x': width * -0.55,
        'y': height * 0.5,
        'r': Math.PI * -0.12,
      },
    
    };

    this.position = {}
    this.setPosition('center');
    this.setTarget('center');

    this.width = width * 0.56;
    this.height = height * 0.44;
    
    this.rounding = width * 0.02;

    this.textSize = 32;

  }

  changeCard(card) {

    if ( card !== this.card ) {

      this.card = card;

    }

  }

  draw() {
    
    if ( !this.card ) { return null; }
    
    push();

    translate(this.position.x, this.position.y);
    rotate(this.rotation);

    rectMode(CENTER);

    noStroke();
    fill(palette['ui']);
    rect(0, 0, this.width, this.height, this.rounding);

    fill(palette['black']);
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    text(this.card.text, 0, 0, this.width * 0.9, this.height * 0.9);

    pop();

  }

  getPosition(positionName) {

    return this.positions[positionName];
    
  }

  setPosition(positionName) {

    const p = this.getPosition(positionName);

    this.position.x = p.x;
    this.position.y = p.y;
    this.rotation = p.r;

  }

  setTarget(positionName) {

    if ( !this.target ) { this.target = {} };
    
    const p = this.getPosition(positionName);

    this.target.x = p.x;
    this.target.y = p.y;
    this.target.rotation = p.r;

  }

  update() {

    // Animation
    const speed = 0.11;
    this.position.x += speed * ( this.target.x - this.position.x );
    this.position.y += speed * ( this.target.y - this.position.y );
    this.rotation += speed * ( this.target.rotation - this.rotation );

  }


}