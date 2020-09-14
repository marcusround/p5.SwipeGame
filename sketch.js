let game, ui;

let mouseClickX;
let swipeState = 'none';

const settings = {

  'previewMode': 'HINT', // 'FULL' or 'HINT', anything else is none
  'swipeSensitivity': 0.1,

}

function clearPreviews() {

  factors.forEach(factor => {
    factor.SetPreview(0);
  })

}

function draw() {

  if (!game.isActive) {
    background(23, 45, 67);
    return;
  }

  background(palette['background']);

  // Swipe position logic
  if (mouseIsPressed) {

    let mouseDiff = mouseX - mouseClickX;

    if (mouseDiff > settings.swipeSensitivity * width) {

      swipeState = 'swipeYes';

    } else if (mouseDiff < -settings.swipeSensitivity * width) {

      swipeState = 'swipeNo';

    } else { 

      swipeState = 'none';
      
    }

  }
  
  evaluateSwipePreview(swipeState);
  
  game.update();
  ui.update();
  
  ui.draw();

}

function enactChoice(choice) {

  game.enactChoice(choice);
  ui.onSwipe(choice);

  setTimeout(() => { game.dealNewCard() }, 700);

}

const evaluateSwipePreview = function () {

  // Check if swipeState has changed since last time,
  // then update UI accordingly.

  let prevSwipeState = 'none';
  return (swipeState) => {

    if (swipeState === prevSwipeState) { return null; }

    prevSwipeState = swipeState;

    setPreview(swipeState);

  }
  
}();

function keyPressed() {

  switch (keyCode) {

    case LEFT_ARROW:
      enactChoice('swipeNo');
      break;

    case RIGHT_ARROW:
      enactChoice('swipeYes');
      break;

    default:
      return null;

  }

}

function mousePressed() {

  mouseClickX = mouseX;

}

function mouseReleased() {

  if ( swipeState !== 'none' ) {
    enactChoice(swipeState);
  }

}

function setPreview(choice) {

  if ( choice === 'none' ) {

    game.clearPreviews();
    ui.goToCentre();
    
  } else {

    game.setPreview(choice);
    ui.setPreview(choice);
    
  }

}

function setup() {

  
  // Fit to portrait 16:9
  const h = innerHeight - 100;
  const w = h * 9 / 16;
  
  createCanvas(w, h)
    .position(innerHeight * 0.025, innerHeight * 0.025);
  
  createP("Upload custom CSV:")
    .position(w * 0.1, innerHeight - 80);
  
  createFileInput(handleFile)
    .position(250, innerHeight - 65);
  
  createP("It must match this layout:")
    .position(w * 0.1, innerHeight - 50);
  
  createButton("Download example CSV")
    .position(250, innerHeight - 35)
    .mousePressed(downloadExampleCSV);
  
  textSize(height * 0.04);
  fill(255);

  game = new SwipeGame();
  ui = new SwipeGameUI(game);

  game.on('dealNewCard', () => { swipeState = 'none' });
  
  loadTable(
    exampleCSVPath,
    'csv',
    'header',
    (t) => {
      exampleCSV = t;
      gameData = loadGameDataFromTable(t);
      game.startNewGame(gameData);
    },
    () => { console.warn("No example csv found.") }
  );

}