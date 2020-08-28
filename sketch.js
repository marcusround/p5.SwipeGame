const exampleCSVPath = 'assets/swipe_game_example.csv';

const previewMode = 'HINT';

let exampleCSV;

let activeCard;
let cards, deck;

const buttons = [];

let factors = [];
let factorManager, factorDisplay;

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

function clearPreviews() {
  
  factors.forEach(factor => {
    factor.SetPreview(0);
  })
  
}

function downloadExampleCSV() {
  
  saveTable(exampleCSV, 'swipe_game_example.csv', 'csv');
  
}

function draw() {

  if (deck.stack.length === 0) {
    background(23, 45, 67);
    return;
  }

  background(palette['background']);
  
  // Draw the active card to screen
  if (activeCard && activeCard.Draw) {
    activeCard.Draw();
  }

  buttons.forEach(b => b.EvaluateMousePosition(mouseX, mouseY));
  
  factorDisplay.EvaluateMousePosition(mouseX, mouseY);
  factorDisplay.Draw();

  buttons.forEach(b => b.Draw());

  activeCard.EvaluateMousePosition(mouseX, mouseY);
  activeCard.Update();
  
}

function enactChoice( choice ) {

  factorManager.ApplyEffects(activeCard.GetEffects(choice));

  // Put active card back to bottom of deck
  deck.AddCardToBottom(activeCard);

  // Deal new card
  activeCard = deck.DealTopCard();

}

function handleFile(file) {
  
  if (!file.name.endsWith('.csv')) {
    console.warn("Uploaded non-CSV file.")
    return null;
  }
  
  return loadTable(
    file.data,
    'csv',
    'header',
    loadFromCSV,
    console.warn("Error loading CSV.")
    );
    
  }

function loadFromCSV(data) {

  cards = {};
  factors = [];
  deck.Clear();

  // First row contains factor names
  factorNames = data.rows[0];
  let i = 1;
  while (factorNames.get('factor' + i)) {
    
    const factor = new Factor({'name': factorNames.get('factor' + i)});

    factors.push(factor);

    i++;

  }

  factorManager.SetFactors(factors);

  data.rows.forEach((row, index) => {

    // Skip first row, which is factor names.
    if (index === 0) { return; };
    
    const card = new Card();

    card.id = row.get('id');
    card.text = row.get('text');

    const cardEffects = {
      'swipeYes': [],
      'swipeNo': []
    }

    let i = 1;
    while (row.get("yes" + i) || row.get("no" + i)) {

      const factorName = factors[i-1].name;
      
      cardEffects['swipeYes'][factorName] = row.getNum("yes" + i, 0);
      cardEffects['swipeNo'][factorName] = row.getNum("no" + i, 0);

      i++;
      
    }

    card.SetEffects('swipeYes', cardEffects['swipeYes']);
    card.SetEffects('swipeNo', cardEffects['swipeNo']);

    if (!(card.id && card.text)) {
      console.error("Invalid Card");
      return;
    }

    if (cards[card.id]) {
      console.error("Duplicate card ID.");
      return;
    }

    cards[card.id] = card;
    deck.AddCardToBottom(card);

  });

  if (deck.stack.length == 0 || deck.stack[0] == undefined) {
    console.error("No cards found in CSV")
  }

  activeCard = deck.DealTopCard();

}

function mousePressed() {

  buttons.forEach(button => {
    button.EvaluateMousePress(mouseX, mouseY);
  });

  activeCard.EvaluateMousePress(mouseX, mouseY);
  
}

function mouseReleased() {

  activeCard.EvaluateMouseReleased(mouseX, mouseY);
  
}

function previewChoice(choice) {
  
  let effects = activeCard.GetEffects(choice);
  factorManager.SetPreviews(effects);
  
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
    .position(200, innerHeight - 65);

  createP("It must match this layout:")
    .position(w * 0.1, innerHeight - 50);

  createButton("Download example CSV")
    .position(200, innerHeight - 35)
    .mousePressed(downloadExampleCSV);

  textSize(height * 0.04);
  fill(255);

  deck = new Deck();
  factorManager = new FactorManager();
  factorDisplay = new FactorDisplay( 
    factorManager,
    {
      'x': 0.50,
      'y': 0.75,
      'width': 0.58,
      'height': 0.32,
      'padding': 0.1,
      'rounding': 0.02,
    }
  );

  loadTable(
    exampleCSVPath,
    'csv',
    'header',
    (t) => { exampleCSV = t; loadFromCSV(t); },
    () => { console.warn("No example csv found.") }
  );

  // Yes Button
  buttons.push(
    new Button({
      'id': 'swipeYes',
      'x': width * 0.888,
      'y': height * 0.33,
      'radius': width * 0.065,
      'colour': palette['positive'],
      'OnHover': () => { previewChoice('swipeYes'); },
      'OnHoverExit': () => { clearPreviews() },
      'OnClick': () => { enactChoice('swipeYes'); },
    }
    ));

  // No Button
  buttons.push(
    new Button({
      'id': 'swipeNo',
      'x': width * 0.111,
      'y': height * 0.33,
      'radius': width * 0.065,
      'colour': palette['negative'],
      'OnHover': () => { previewChoice('swipeNo'); },
      'OnHoverExit': () => { clearPreviews(); },
      'OnClick': () => { enactChoice('swipeNo'); },
    }
    ));

}