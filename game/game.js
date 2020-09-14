class SwipeGame {

  constructor() {

    this.deck = new Deck();
    this.factorManager = new FactorManager(this);
    this.isActive = false;
    this._callbacks = {};
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

    if (this.activeCard) {
      this.deck.addCardToBottom(this.activeCard);
    }

    this.activeCard = this.deck.dealTopCard();

    this.trigger('dealNewCard');

  }

  enactChoice(choice) {

    if ( ! this.activeCard ) { return null; };

    const effects = this.activeCard.getEffects(choice);

    this.clearPreviews();
    this.factorManager.applyEffects(effects);

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