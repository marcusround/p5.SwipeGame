class Card {

  constructor() {

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

