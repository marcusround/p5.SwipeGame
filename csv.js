const exampleCSVPath = 'assets/swipe_game_example.csv';
let exampleCSV;

function downloadExampleCSV() {

  saveTable(exampleCSV, 'swipe_game_example.csv', 'csv');

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

function loadGameDataFromTable(table) {

  const gameData = {

    'cards': [],
    'factors': [],

  }

  // First row contains factor names
  factorNames = table.rows[0];
  let i = 1;
  while (factorNames.get('factor' + i)) {

    const factor = new Factor({ 'name': factorNames.get('factor' + i) });

    gameData.factors.push(factor);

    i++;

  }

  table.rows.forEach((row, index) => {

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

      const factorName = gameData.factors[i - 1].name;

      cardEffects['swipeYes'][factorName] = row.getNum("yes" + i, 0);
      cardEffects['swipeNo'][factorName] = row.getNum("no" + i, 0);

      i++;

    }

    card.setEffects('swipeYes', cardEffects['swipeYes']);
    card.setEffects('swipeNo', cardEffects['swipeNo']);

    if (!(card.id && card.text)) {
      console.error("Invalid Card");
      return;
    }

    if (gameData.cards[card.id]) {
      console.error("Duplicate card ID.");
      return;
    }

    gameData.cards.push(card);

  });

  return gameData;

}