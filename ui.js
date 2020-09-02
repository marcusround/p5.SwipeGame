class SwipeGameUI {

  constructor(swipeGame) {

    this.game = swipeGame;
    
    this.cardUI = new CardUI();

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

    this.cardUI.draw();
    this.factorDisplay.draw();

  }

  onDealNewCard() {

    this.cardUI.setPosition('start');
    this.cardUI.setTarget('center');
    
  }

  onSwipeNo() {

    this.cardUI.setTarget('swipeYes');

  }
  
  onSwipeYes() {

    this.cardUI.setTarget('swipeNo');

  }

  onSwipePreviewYes() {

    this.cardUI.setTarget('swipePreviewYes');

  }

  onSwipePreviewNo() {

    this.cardUI.setTarget('swipePreviewNo');
    
  }
  
  update() {

    this.cardUI.changeCard(this.game.activeCard);
    this.factorDisplay.evaluateMousePosition(mouseX, mouseY);

  }

}

  // // Yes Button
  // buttons.push(
  //   new Button({
  //     'id': 'swipeYes',
  //     'x': width * 0.888,
  //     'y': height * 0.33,
  //     'radius': width * 0.065,
  //     'colour': palette['positive'],
  //     'OnHover': () => { previewChoice('swipeYes'); },
  //     'OnHoverExit': () => { clearPreviews() },
  //     'OnClick': () => { enactChoice('swipeYes'); },
  //   }
  //   ));

  // // No Button
  // buttons.push(
  //   new Button({
  //     'id': 'swipeNo',
  //     'x': width * 0.111,
  //     'y': height * 0.33,
  //     'radius': width * 0.065,
  //     'colour': palette['negative'],
  //     'OnHover': () => { previewChoice('swipeNo'); },
  //     'OnHoverExit': () => { clearPreviews(); },
  //     'OnClick': () => { enactChoice('swipeNo'); },
  //   }
  //   ));