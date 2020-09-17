let game, ui;

let mouseClickX;
let swipeState = 'none';
let gameOver = false;
let endScore = 0;

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

  if (gameOver) {

    background(23, 45, 67);

    push();
    noStroke();
    fill(palette['ui']);
    textSize(height * 0.04);
    textAlign(CENTER);
    text("Game Over.\nScore: " + endScore, width/2, height/2);

    pop();
    return;

  }

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

  setTimeout(() => { game.endTurn() }, 700);

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
  const h = innerHeight;
  const w = h * 9 / 16;
  
  createCanvas(w, h)
    .position(0,0);
    
  createP("Upload custom CSV:")
    .position(w * 1.05, 10);
  
  createFileInput(handleFile)
    .position(w * 1.05, 50);
  
  createP("It must match this layout:")
    .position(w * 1.05, 100);
  
  createButton("Download example CSV")
    .position(w * 1.05, 140)
    .mousePressed(downloadExampleCSV);
  
  textSize(height * 0.04);
  fill(255);

  game = new SwipeGame();
  ui = new SwipeGameUI(game);

  game.on('dealNewCard', () => { swipeState = 'none' });
  game.on('gameEnd', (score) => { gameOver = true; endScore = score });
  
  loadTable(
    exampleCSVPath,
    'csv',
    'header',
    (t) => {
      exampleCSV = t;
      const gameData = loadGameDataFromTable(t);
      game.startNewGame(gameData);
    },
    () => { console.warn("No example csv found.") }
  );

}