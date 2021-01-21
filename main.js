var middlePile = document.getElementById("middlePile");
var currentCard = document.getElementById("currentCard");
var message = document.getElementById("message");
var playerPile1 = document.getElementById("player1");
var playerPile2 = document.getElementById("player2");
var playerWins1 = document.getElementById("playerWins1");
var playerWins2 = document.getElementById("playerWins2");
var cardCount1 = document.getElementById("player1CardCount");
var cardCount2 = document.getElementById("player2CardCount");
var buttonPlayAgain = document.getElementById("playAgain");
var buttonNewPlayers = document.getElementById("newPlayers");
var playerChoiceBox = document.getElementById("playerChoiceBox");

var currentGame;

document.addEventListener("keydown", playCard);
window.addEventListener("load", gameReload);
buttonPlayAgain.addEventListener("click", playAgain);
buttonNewPlayers.addEventListener("click", newPlayers);

function display(feature) {
  feature.classList.remove("hidden");
}
function hide(feature) {
  feature.classList.add("hidden");
}

function checkPlayerPile() {
  if(currentGame.players[0].hand.length === 0) {
    hide(playerPile1);
} else if(currentGame.players[1].hand.length === 0) {
    hide(playerPile2);
}
};

function createAltText() {
  for(var suit in currentGame.suits) {
    var currentSuit = currentGame.suits[suit];
    if(currentSuit.includes(currentGame.middlePile[currentGame.middlePile.length - 1])) {
      currentSuit = suit;
      return currentSuit;
    }
  };
};

function displayMiddleCard() {
  display(middlePile);
  var currentCard = currentGame.middlePile[currentGame.middlePile.length - 1];
    if(currentGame.currentPlayer === 1) {
      middlePile.innerHTML = `<img class="player-cards middle-card-player-1" src="${currentCard}" id="currentCard" alt="card ${createAltText()}">`
   } else {
      middlePile.innerHTML = `<img class="player-cards middle-card-player-2" src="${currentCard}" id="currentCard" alt="card ${createAltText()}">`
   }
};

function displayPlayerCardCount() {
    cardCount1.innerText = currentGame.players[0].playerCardCount();
    cardCount2.innerText = currentGame.players[1].playerCardCount();
}

function displaySlapMessage(player) {
  display(message);
  var slaps = ["JACK", "DOUBLE", "SANDWICH"];
  for(var i = 0; i < slaps.length; i++) {
    if(currentGame.slapType === slaps[i]) {
      message.innerText = `${slaps[i]}! Player ${currentGame.whoSlapped} takes the pile!`
    }
  };
  if(currentGame.slapType === "INVALID") {
  message.innerText = `INVALID SLAP! Player ${currentGame.whoSlapped} forfeits a card to ${player}!`
  }
};

function displayRedemptionMessage(player) {
  message.innerText = `REDEMPTION! ${player} back in the game!!`;
  display(message);
};

function displayWinningMessage(slapType, player) {
  display(message);
  message.innerText = `${slapType}! ${player} wins!!`;
  hide(middlePile);
}

function displayPlayerWins() {
  playerWins1.innerText = `${currentGame.players[0].wins} Wins`;
  playerWins2.innerText = `${currentGame.players[1].wins} Wins`;
};

function checkEmptyHand() {
  if(currentGame.players[0].hand.length === 0) {
    currentGame.currentPlayer = 2;
    return true;
} else if(currentGame.players[1].hand.length === 0) {
    currentGame.currentPlayer = 1;
    return true;
}
  return false;
};

function checkMiddlePile() {
  if(currentGame.middlePile.length === 0) {
    return true;
  }
};

function switchPlayers() {
  if(currentGame.currentPlayer === 1) {
    currentGame.currentPlayer = 2;
} else {
    currentGame.currentPlayer = 1;
}
};

function validateKeyCode(event) {
  if(event.keyCode !== 81 && event.keyCode !== 80 && event.keyCode !== 70 && event.keyCode !== 74) {
    return true;
  }
};

function playCard() {
  if(validateKeyCode(event)) {
    return;
  }
  else if(!checkEmptyHand()) {
    validatePlayAction(event);
    displayPlayerCardCount();
    checkPlayerPile();
} else {
  lastPlay(event);
}
};

function validatePlayAction(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 1) {
    validatePlayCard();
} else if(event.keyCode === 70) {
    validateSlapCard(1);
} else if(event.keyCode === 80 && currentGame.currentPlayer === 2) {
    validatePlayCard();
} else if (event.keyCode === 74) {
    validateSlapCard(2);
}
};

function validatePlayCard(player) {
  currentGame.playCard();
  hide(message);
  displayMiddleCard();
  switchPlayers();
}

function validateSlapCard(whoSlapped) {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = whoSlapped;
  if(currentGame.slap()) {
    hide(middlePile);
  }
  displaySlapMessage("player 1");
};

function lastPlay(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 1) {
     winnerDeals(currentGame.players[0]);
    displayPlayerCardCount();
} else if( event.keyCode === 80 && currentGame.currentPlayer === 2) {
     winnerDeals(currentGame.players[1]);
    displayPlayerCardCount();
} else if(event.keyCode === 70 && currentGame.players[1].hand.length === 0) {
    winningSlapPlayer1();
} else if(event.keyCode === 74 && currentGame.players[0].hand.length === 0) {
    winningSlapPlayer2();
}
  redemptionSlap(event);
};

function winnerDeals(player) {
  var winningHand = player.hand;
  currentGame.playCard();
  displayMiddleCard();
  if(winningHand.length === 0) {
    hide(middlePile);
    var middleCards = currentGame.middlePile.splice(0);
    player.hand = middleCards;
    player.hand.shufflePlayerDeck();
  }
}

function winningSlapPlayer1() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 1;
  if(currentGame.slapJack()) {
    displayWinningMessage("SLAPJACK", "player 1");
    displayPlayerCardCount();
    currentGame.players[0].wins++;
    saveGame();
    displayPlayerWins();
    displayEndGameOptions();
  }
};

function winningSlapPlayer2() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 2;
  if(currentGame.slapJack()) {
    displayWinningMessage("SLAPJACK", "player 2");
    displayPlayerCardCount();
    currentGame.players[1].wins++;
    saveGame();
    displayPlayerWins();
    displayEndGameOptions();
  }
};

function redemptionSlap(event) {
  var playerHand0 = currentGame.players[0].hand;
  var playerHand1 = currentGame.players[1].hand;
  if(event.keyCode === 70 && playerHand0.length === 0) {
    redemptionAttemptPlayer1();
} else if(event.keyCode === 74 && playerHand1.length === 0) {
    redemptionAttemptPlayer2();
}
};

function redemptionAttemptPlayer1() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 1;
  if(currentGame.slapJack()) {
    display(playerPile1);
    displayRedemptionMessage("player 1");
    displayPlayerCardCount();
    currentGame.currentPlayer = 1;
} else {
    displayWinningMessage("INVALID SLAP", "player 2");
    currentGame.players[1].wins++;
    saveGame();
    displayPlayerWins();
    displayEndGameOptions();
  }
};

function redemptionAttemptPlayer2() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 2;
  if(currentGame.slapJack()) {
    display(playerPile2);
    displayRedemptionMessage("player 2");
    displayPlayerCardCount();
    currentGame.currentPlayer = 2;
} else {
    displayWinningMessage("INVALID SLAP", "player 1");
    currentGame.players[0].wins++;
    saveGame();
    displayPlayerWins();
    displayEndGameOptions();
  }
};

function displayEndGameOptions() {
  setTimeout(function() {
    display(playerChoiceBox);
  }, 2000);
};

function saveGame() {
  for(var i = 0; i < 2; i++) {
    currentGame.players[i].saveToStorage();
  }
};

function setUpGame() {
  hide(message);
  display(playerPile1);
  display(playerPile2);
  displayPlayerWins();
  currentGame.shuffleDeck();
  currentGame.dealCards();
  displayPlayerCardCount();
}

function newPlayers() {
  hide(playerChoiceBox);
  localStorage.clear();
  var player1 = new Player(0, 1);
  var player2 = new Player(0, 2);
  currentGame = new Game([player1, player2]);
  setUpGame();
};

function playAgain() {
  hide(playerChoiceBox);
  var savedPlayer1 = localStorage.getItem("1");
  var savedPlayer2 = localStorage.getItem("2");
  savedPlayer1 = JSON.parse(savedPlayer1);
  savedPlayer2 = JSON.parse(savedPlayer2);
  savedPlayer1 = new Player(savedPlayer1.wins, 1);
  savedPlayer2 = new Player(savedPlayer2.wins, 2);
  currentGame = new Game([savedPlayer1, savedPlayer2]);
  setUpGame();
};

function gameReload() {
  if(localStorage.length === 0 ) {
    newPlayers();
  } else {
    playAgain();
  }
};
