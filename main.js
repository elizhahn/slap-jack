//DOM SELECTORS-----------------------------
var middlePile = document.getElementById("middle-pile");
var currentCard = document.getElementById("current-card");
var message = document.getElementById("message");
var playerPile1 = document.getElementById("player1");
var playerPile2 = document.getElementById("player2");
var playerWins1 = document.getElementById("player-1-wins");
var playerWins2 = document.getElementById("player-2-wins");
var currentGame;

document.addEventListener("keydown", playCard);
window.addEventListener("load", gameReset);


function display(feature) {
  feature.classList.remove("hidden");
}
function hide(feature) {
  feature.classList.add("hidden");
}

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
      middlePile.innerHTML = `<img class="player-cards middle-card-player-1" src="${currentCard}" id="current-card" alt="card ${createAltText()}">`
   } else {
      middlePile.innerHTML = `<img class="player-cards middle-card-player-2" src="${currentCard}" id="current-card" alt="card ${createAltText()}">`
   }
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
}

function switchPlayers() {
  if(currentGame.currentPlayer === 1) {
    currentGame.currentPlayer = 2;
} else {
    currentGame.currentPlayer = 1;
}
};

function hidePlayerPile() {
  if(currentGame.players[0].hand.length === 0){
    hide(playerPile1);
} else if(currentGame.players[1].hand.length === 0){
   hide(playerPile2);
}
};

function displayRedemptionMessage(player) {
  message.innerText = `REDEMPTION! ${player} back in the game!!`;
  display(message);
}

function displayWinningMessage(slapType, player) {
  display(message);
  message.innerText = `${slapType}! ${player} wins!!`;
  hide(middlePile);
}

function displayPlayerWins() {
  playerWins1.innerText = `${currentGame.players[0].wins} Wins`;
  playerWins2.innerText = `${currentGame.players[1].wins} Wins`;
}


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

//Function to validate and execute any play Action
function validatePlayAction(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 1) {
    validatePlayCard1();
  } else if(event.keyCode === 70) {
    validateSlapCard1();
  } else if(event.keyCode === 80 && currentGame.currentPlayer === 2) {
    validatePlayCard2();
  } else if (event.keyCode === 74){
    validateSlapCard2();
  }
};

function checkMiddlePile() {
  if(currentGame.middlePile.length === 0) {
    return true;
  }
}

//Refactor validatePlayAction
function validatePlayCard1() {
  currentGame.playCard();
  hide(message);
  displayMiddleCard();
  switchPlayers();
}

function validateSlapCard1() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 1;
    if(currentGame.slap()) {
      hide(middlePile);
      displaySlapMessage("player 2");
  } else {
      displaySlapMessage("player 2");
    }
};

function validatePlayCard2() {
   currentGame.playCard();
   hide(message);
   displayMiddleCard()
   display(middlePile);
   switchPlayers();
}

function validateSlapCard2() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 2;
    if(currentGame.slap()) {
      hide(middlePile);
      displaySlapMessage("player 1");
    } else {
      displaySlapMessage("player 1");
    }
};


function playCard() {
  if(event.keyCode !== 81 && event.keyCode !== 80 && event.keyCode !== 70 && event.keyCode !== 74) {
    return;
  }
  else if(!checkEmptyHand()) {
    validatePlayAction(event);
    hidePlayerPile();
    console.log(currentGame.middlePile);
} else {
  lastPlay(event);
}
};

function lastPlay(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 1) {
    winnerDealsPlayer1();
} else if( event.keyCode === 80 && currentGame.currentPlayer === 2) {
    winnerDealsPlayer2();
} else if(event.keyCode === 70 && currentGame.players[1].hand.length === 0) {
    winningSlapPlayer1();
} else if(event.keyCode === 74 && currentGame.players[0].hand.length === 0) {
    winningSlapPlayer2();
}
  redemptionSlap(event);
};

function winnerDealsPlayer1() {
  var playerHand0 = currentGame.players[0].hand;
  currentGame.playCard();
  displayMiddleCard();
    if(playerHand0.length === 0) {
       hide(middlePile);
       var cardsWon = currentGame.middlePile.splice(0);
       currentGame.players[0].hand = cardsWon;
       currentGame.players[0].shufflePlayerDeck();
    }
};

function winnerDealsPlayer2() {
  var playerHand1 = currentGame.players[1].hand;
  currentGame.playCard();
  displayMiddleCard();
    if(playerHand1.length === 0) {
      hide(middlePile);
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[1].hand = cardsWon;
      currentGame.players[1].shufflePlayerDeck();
    }
};

function winningSlapPlayer1() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 1;
  if(currentGame.slapJack()) {
    displayWinningMessage("SLAPJACK", "player 1");
    currentGame.players[0].wins++;
    saveGame();
    gameReset();
    pageRefresh();
  }
};

function winningSlapPlayer2() {
  if(checkMiddlePile()) {
    return;
  }
  currentGame.whoSlapped = 2;
    if(currentGame.slapJack()) {
      displayWinningMessage("SLAPJACK", "player 2");
      currentGame.players[1].wins++;
      saveGame();
      gameReset();
      pageRefresh();
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
    currentGame.currentPlayer = 1;
} else {
    displayWinningMessage("INVALID SLAP", "player 2");
    currentGame.players[1].wins++;
    saveGame();
    gameReset();
    pageRefresh();
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
    currentGame.currentPlayer = 2;
} else {
    displayWinningMessage("INVALID SLAP", "player 1");
    currentGame.players[0].wins++;
    saveGame();
    gameReset();
    pageRefresh();
  }
};

function pageRefresh() {
  setTimeout(function() {
    window.location.reload();
  }, 3000);
}

function gameReset() {
  if(localStorage.length === 0) {
    var player1 = new Player(0, 1);
    var player2 = new Player(0, 2);
    currentGame = new Game([player1, player2]);
    displayPlayerWins();
    currentGame.shuffleDeck();
    currentGame.dealCards();
 } else {
    playAgain();
 }
};


function playAgain() {
  var savedPlayer1 = localStorage.getItem("1");
  var savedPlayer2 = localStorage.getItem("2");
  savedPlayer1 = JSON.parse(savedPlayer1);
  savedPlayer2 = JSON.parse(savedPlayer2);
  savedPlayer1 = new Player(savedPlayer1.wins, 1);
  savedPlayer2 = new Player(savedPlayer2.wins, 2);
  currentGame = new Game([savedPlayer1, savedPlayer2]);
  displayPlayerWins();
  currentGame.shuffleDeck();
  currentGame.dealCards();
}

function saveGame() {
  for(var i = 0; i < 2; i++) {
    currentGame.players[i].saveToStorage();
  }
}
