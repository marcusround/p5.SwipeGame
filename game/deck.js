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

    return this.stack.splice(0, 1)[0];

  }

  shuffle() {

    /** https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb */
    for (let i = this.stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this.stack[i]
      this.stack[i] = this.stack[j]
      this.stack[j] = temp
    }

  }

}