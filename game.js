class SwipeGame {

    constructor() {

        this.factorManager = new FactorManager();
        this.deck = new Deck();
        this.Reset();
        
    }

    AddCards(cards) {

        cards.forEach(card => {
            this.deck.AddCardToBottom(card);
        });
        
    }

    Reset() {

        this.cards = {};
        this.deck.Clear();

    }

    Start() {

        this.activeCard = this.deck.DealTopCard();
        
    }
    
}