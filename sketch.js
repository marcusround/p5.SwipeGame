const exampleCSVPath = 'assets/swipe_game_example.csv'

let exampleCSV;

let activeCard;
let cards, deck;

const buttons = [];

const factorCount = 4;
const factors = [];

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
    factors.push(new FactorBar(i));
  }

  // Yes Button
  buttons.push(
    new Button({
      'x': width * 0.888,
      'y': height * 0.33,
      'radius': width * 0.065,
      'colour': '#00cc00',
      'clickEffect': () => { EnactUserChoice(true) },
    }
    ));

  // No Button
  buttons.push(
    new Button({
      'x': width * 0.111,
      'y': height * 0.33,
      'radius': width * 0.065,
      'colour': '#cc0000',
      'clickEffect': () => { EnactUserChoice(false) },
    }
    ));

}

function draw() {

  if (deck.stack.length === 0) {
    background(23, 45, 67);
    return;
  }

  background(78, 90, 123);

  // Draw the active card to screen
  if (activeCard && activeCard.Draw) {
    activeCard.Draw();
  }

  factors.forEach(b => b.Draw());
  buttons.forEach(b => b.Draw());

}

function EnactUserChoice(b) {

  const boolean = Boolean(b);

  ApplyEffects(activeCard, boolean);

  // Put active card back to bottom of deck
  deck.AddCardToBottom(activeCard);

  // Deal new card
  activeCard = deck.DealTopCard();

}

function ApplyEffects(card, boolean) {

  const effects = card.effects[Boolean(boolean)];

  for (let i = 0; i < effects.length; i++) {

    factors[i].ApplyEffect(effects[i]);

  }

}

function loadCardsFromCSV(data) {

  cards = {};
  deck.Clear();

  data.rows.forEach(row => {

    const card = new Card();

    card.id = row.get('id');
    card.text = row.get('text');

    card.effects = {
      true: [],
      false: []
    }

    let i = 1;
    while (row.get("yes" + i) || row.get("no" + i)) {
      card.effects[true].push(row.get("yes" + i));
      card.effects[false].push(row.get("no" + i));
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

function downloadExampleCSV() {

  saveTable(exampleCSV, 'swipe_game_example.csv', 'csv');

}

function mousePressed() {
  buttons.forEach(button => {
    if (button.IsWithinRange(mouseX, mouseY)) {
      button.Click();
    }
  });
}