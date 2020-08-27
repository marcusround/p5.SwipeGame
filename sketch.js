const exampleCSVPath = 'assets/swipe_game_example.csv'

let exampleCSV;

let activeCard;
let cards, deck;

const buttons = [];

const factorCount = 4;
const factors = [];
const factorBars = [];
const factorNames = ["Lorem", "Ipsum", "Dolor", "Sit amet"];

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

function applyEffects(card, choice) {

  const effects = card.effects[choice];
  
  for (let i = 0; i < effects.length; i++) {
    
    factors[i].ApplyEffect(effects[i]);
    
  }
  
}

function clearPreviews() {
  
  factorBars.forEach(bar => {
    bar.SetPreview(0);
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
  factorBars.forEach(b => b.EvaluateMousePosition(mouseX, mouseY));

  factorBars.forEach(b => b.Draw());
  buttons.forEach(b => b.Draw());
  
}

function enactChoice( choice ) {

  applyEffects(activeCard, choice);

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
    loadCardsFromCSV,
    console.warn("Error loading CSV.")
    );
    
  }

function loadCardsFromCSV(data) {

  cards = {};
  deck.Clear();

  data.rows.forEach(row => {

    const card = new Card();

    card.id = row.get('id');
    card.text = row.get('text');

    card.effects = {
      'swipeYes': [],
      'swipeNo': []
    }

    let i = 1;
    while (row.get("yes" + i) || row.get("no" + i)) {
      card.effects['swipeYes'].push(row.get("yes" + i));
      card.effects['swipeNo'].push(row.get("no" + i));
      i++;
    }

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
}

function previewChoice(choice) {
  
  let i = 0;
  factorBars.forEach(bar => {
    bar.SetPreview(activeCard.effects[choice][i]);
    i++;
  })

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

  loadTable(
    exampleCSVPath,
    'csv',
    'header',
    (t) => { exampleCSV = t; loadCardsFromCSV(t); },
    () => { console.warn("No example csv found.") }
  );

  for (let i = 0; i < factorCount; i++) {

    const factor = new Factor({'name': factorNames[i]});

    factors.push(factor);
    factorBars.push(new FactorBar({
      'index': i,
      'factor': factor,
      'previewMode': 'FULL',
    }));

  }

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