class SwipeGame {

  constructor(callbacks) {

    this.deck = new Deck();
    this.factorManager = new FactorManager(this);
    this.isActive = false;
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

  }

  enactChoice(choice) {

    if ( ! this.activeCard ) { return null; };

    const effects = this.activeCard.getEffects(choice);

    this.factorManager.applyEffects(effects);

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
    this.deck.clear();

    this.addCards(gameData.cards);

    gameData.cards.forEach((card) => {
      this.cards[card.id] = card;
    })

    this.factorManager.setFactors(gameData.factors);

    this.start();

  }



  update() {

  }

}