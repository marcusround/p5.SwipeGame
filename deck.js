class Deck {

    constructor() {

        this.clear();

    }

    addCardToBottom(card) {

        this.stack.push(card);

    }

    dealTopCard() {

        return this.stack.splice(0,1)[0]; 

    }

    clear() {

        this.stack = [];
        
    }
    
}