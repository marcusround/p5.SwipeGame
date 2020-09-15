

const palette = {

  'background': '#456789',
  'background-2': '#99eaea',
  'positive': '#11d211',
  'negative': '#e32222',
  'foreground': '#00cccc',
  'highlight': '#ffd633',
  'ui': '#eeeeee',
  'black': '#123456',

}

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

    this.game.on('dealNewCard', () => { this.onDealNewCard() });

  }

  goToCentre() {

    this.cardUI.setTarget('center');

  }

  draw() {

    this.cardUI.draw();
    this.factorDisplay.draw();

  }

  onDealNewCard() {

    this.cardUI.setPosition('start');
    this.cardUI.setTarget('center');

  }

  onSwipe(choice) {

    if (choice == 'swipeYes') {

      this.onSwipeYes();

    }

    else if (choice == 'swipeNo') {

      this.onSwipeNo();

    }

  }

  onSwipeYes() {

    this.cardUI.setTarget('swipeYes');

  }

  onSwipeNo() {

    this.cardUI.setTarget('swipeNo');

  }

  onSwipePreviewYes() {

    this.cardUI.setTarget('previewYes');

  }

  onSwipePreviewNo() {

    this.cardUI.setTarget('previewNo');

  }

  setPreview(choice) {

    if (choice == 'swipeYes') {

      this.onSwipePreviewYes();

    }

    else if (choice == 'swipeNo') {

      this.onSwipePreviewNo();

    }

  }

  update() {

    this.cardUI.changeCard(this.game.activeCard);
    this.cardUI.update();
    this.factorDisplay.evaluateMousePosition(mouseX, mouseY);

  }

}