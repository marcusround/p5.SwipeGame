class SwipeGame {

  constructor() {

    this.deck = new Deck();
    this.factorManager = new FactorManager(this);
    this.isActive = false;
    this._callbacks = {};

    this.info = {
      'cardsDealt': 0,
      'currentPhase': 0,
    };
    
    this.reset();

  }

  addCards(cards) {

    cards.forEach(card => {
      this.deck.addCardToBottom(card);
    });

  }

  clearPreviews() {

    this.factorManager.clearPreviews();
    
  }

  dealNewCard() {

    if (this.activeCard && this.activeCard.discardAfterUse === false ) {
      this.deck.addCardToBottom(this.activeCard);
    }

    this.activeCard = this.deck.dealTopCard();
    this.info.cardsDealt += 1;

    this.trigger('dealNewCard');

  }

  enactChoice(choice) {

    if ( ! this.activeCard ) { return null; };

    const effects = this.activeCard.getEffects(choice);

    this.clearPreviews();
    this.factorManager.applyEffects(effects);

  }

  nextTurn() {

    if (this.info.cardsDealt % 3 === 0) {

      this.phaseEnd();

    } else {

      this.dealNewCard();
      
    }
    
  }

  on(eventName, callback) {

    if ( this._callbacks[eventName] === undefined ) {
      this._callbacks[eventName] = [];
    }
    
    this._callbacks[eventName].push(callback);
    
  }

  reset() {

    this.cards = {};
    this.deck.clear();

  }

  phaseEnd() {

    const phaseEndCard = new Card({
      'id': 'phaseEnd' + this.info.currentPhase,
      'text': 'End of phase ' + this.info.currentPhase,
    })

    const effects = {'Budget': 10};
    
    phaseEndCard.setEffects('swipeYes', effects);
    phaseEndCard.setEffects('swipeNo', effects);

    this.deck.addCardToTop(phaseEndCard);
    
    this.trigger('phaseEnd');

    this.info.currentPhase += 1;
    
    this.dealNewCard();
    
  }

  setPreview(choice) {

    if ( this.activeCard ) {

      const effects = this.activeCard.getEffects(choice);
      this.factorManager.setPreviews(effects);

    }
    
  }

  start() {

    if (this.deck.length === 0) { console.warn("Can't start game with empty deck.") }

    this.isActive = true;

    this.dealNewCard();

  }

  startNewGame(gameData) {

    this.isActive = true;
    this.cards = {};
    this.activeCard = null;
    this.deck.clear();
    
    this.addCards(gameData.cards);
    
    gameData.cards.forEach((card) => {
      this.cards[card.id] = card;
    })
    
    this.factorManager.setFactors(gameData.factors);

    this.start();

  }

  trigger(eventName, ...args) {

    const callbacks = this._callbacks[eventName];

    if ( callbacks && callbacks.forEach ) {

      callbacks.forEach( f => f(...args) )
      
    }
    
  }

  update() {

  }

}