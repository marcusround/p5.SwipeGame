class SwipeGameUI {

  constructor(swipeGame) {

    this.game = swipeGame;
    
    this.card = new CardUI();

    this.factorDisplay = new FactorDisplay(
      this.game.factorManager,
      {
        'x': 0.50,
        'y': 0.75,
        'width': 0.58,
        'height': 0.32,
        'padding': 0.1,
        'rounding': 0.02,
      }
    );

  }

  draw() {



  }

}