class Deck {

    constructor() {

        this.Clear();

    }

    AddCardToBottom(card) {

        this.stack.push(card);

    }

    DealTopCard() {

        return this.stack.splice(0,1)[0]; 

    }

    Clear() {

        this.stack = [];
        
    }
    
}