class Factor {

  constructor(p) {

    this.name = p.name;
    this.state = p.initialState || 50;
    this.preview = p.initialPreview || 0;

  }

  ApplyEffect(effect) {

    this.state += Number(effect);

    if (this.state > 100) { this.state = 100 }
    if (this.state < 0) { this.state = 0 }

  }

  SetPreview(x) {

    this.preview = x;
    
  }

}

class FactorManager {

  constructor(factors) {

    this.factorListeners = [];
    this.SetFactors(factors);

  }

  ApplyEffects(effects) {

    factors.forEach(factor => {

      factor.ApplyEffect(effects[factor.name]);
      
    });

  }

  SetFactors(factors) {

    this.factors = [];

    if (factors) {

      factors.forEach(factor => {
        this.factors.push(factor);
      });
      
    }

    this.factorListeners.forEach(listener => listener(factors));
    
  }
  
  SetPreviews(effects) {

    factors.forEach(factor => {

      factor.SetPreview(effects[factor.name]);
      
    });
    
  }
  
}