class Card {

  constructor(p = {}) {

    this.id = p.id || "";
    this.text = p.text || "";
    this.discardAfterUse = ( p.discardAfterUse === false ) ? false : true;

    this._effects = {};
    
  }
  
  getEffects(effectsType, effectsName = null) {
    
    // eg.
    //    effectsType = 'swipeYes', 'swipeNo'
    //     effectName = 'Budget', 'Impressions'
    
    if (effectsName) {
      
      const effects = this._effects[effectsType][effectsName] || [];
      return effects;
      
    } else {
      
      const effects = this._effects[effectsType] || {};
      return effects;
      
    }
    
  }
  
  setEffects(effectsType, effects) {
    
    // eg.
    //   effectsType = 'swipeYes'
    //       effects = { 'Budget': -10, 'Impressions': +4 }
    
    this._effects[effectsType] = effects;
    
  }
  
}

