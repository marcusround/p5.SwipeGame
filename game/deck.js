class Deck {

    constructor() {

        this.clear();

    }

    addCardToBottom(card) {

        this.stack.push(card);

    }

    addCardToTop(card) {

        this.stack.unshift(card);
        
    }

    clear() {

        this.stack = [];
        
    }
    
    dealTopCard() {

        return this.stack.splice(0,1)[0]; 

    }

    shuffle() {


        
    }
    
}