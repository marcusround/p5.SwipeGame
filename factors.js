class Factor {

  constructor(p) {

    this.name = p.name;
    this.state = p.initialState || 50;
    this.preview = p.initialPreview || 0;

  }

  applyEffect(effect) {

    this.state += Number(effect);

    if (this.state > 100) { this.state = 100 }
    if (this.state < 0) { this.state = 0 }

  }

  setPreview(x) {

    this.preview = x;
    
  }

}

class FactorManager {

  constructor(game) {

    this.factorListeners = [];
    this.game = game;
    this.setFactors(game.factors);

  }

  applyEffects(effects) {

    this.factors.forEach(factor => {

      factor.applyEffect(effects[factor.name]);
      
    });

  }

  clearPreviews() {

    this.factors.forEach(factor => {

      factor.setPreview(0);
      
    });
    
  }

  setFactors(factors) {

    this.factors = [];

    if (factors) {

      factors.forEach(factor => {
        this.factors.push(factor);
      });
      
    }

    this.factorListeners.forEach(listener => listener(factors));
    
  }
  
  setPreviews(effects) {

    this.factors.forEach(factor => {
      
      factor.setPreview(effects[factor.name]);
      
    });

  }
  
}