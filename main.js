//DOM SELECTORS-----------------------------
var middlePile = document.getElementById("middle-pile");
var currentCard = document.getElementById("current-card");
var message = document.getElementById("message");
var playerPile1 = document.getElementById("player1");
var playerPile2 = document.getElementById("player2");
var currentGame;

document.addEventListener("keydown", playCard);
window.addEventListener("load", gameReset);


function show(feature) {
  feature.classList.remove("hidden");
}
function hide(feature) {
  feature.classList.add("hidden");
}

function displayMiddleCard() {
  var currentCard = currentGame.middlePile[currentGame.middlePile.length - 1];
    if(currentGame.currentPlayer === 0) {
      middlePile.innerHTML = `<img class="player-cards middle-card-player-1" src="${currentCard}" id="current-card">`
   } else {
      middlePile.innerHTML = `<img class="player-cards middle-card-player-2" src="${currentCard}" id="current-card">`
   }
}

function displaySlapMessage() {
  show(message);
  var slaps = ["jack", "double", "sandwich"];
    for(var i = 0; i < slaps.length; i++){
      if(currentGame.slapType === slaps[i]){
        message.innerText = `${slaps[i].toUpperCase()}! Player ${currentGame.whoSlapped + 1} takes the pile!`
    } else if(currentGame.slapType === "invalid" && currentGame.whoSlapped === 0) {
        message.innerText = "INVALID SLAP! Player 1 forfeits a card to Player 2!"
    } else if(currentGame.slapType === "invalid" && currentGame.whoSlapped === 1) {
        message.innerText = "INVALID SLAP! Player 2 forfeits a card to Player 1"
    }
  };
};

function switchPlayers() {
  if(currentGame.currentPlayer === 0) {
    currentGame.currentPlayer = 1;
} else {
    currentGame.currentPlayer = 0;
}
};

function hidePlayerPile() {
  if(currentGame.players[0].hand.length === 0){
    hide(playerPile1);
} else if(currentGame.players[1].hand.length === 0){
   hide(playerPile2);
}
};

function showRedemptionMessage(player) {
  message.innerText = `REDEMPTION! ${player} back in the game!!`;
  show(message);
}

function showWinningMessage(slapType, player) {
  show(message);
  message.innerText = `${slapType}! ${player} wins!!`;
  hide(middlePile);
}


function checkEmptyHand() {
  if(currentGame.players[0].hand.length === 0) {
    currentGame.currentPlayer = 1;
    return true;
} else if(currentGame.players[1].hand.length === 0) {
    currentGame.currentPlayer = 0;
    return true;
}
  return false;
};

//Function to validate and execute any play Action
function validatePlayAction(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 0) {
      currentGame.playCard();
      displayMiddleCard()
      show(middlePile);
      switchPlayers();
  } else if(event.keyCode === 70) {
      currentGame.whoSlapped = 0;
      if(currentGame.slap()){
        hide(middlePile);
        displaySlapMessage();
      } else {
        displaySlapMessage();
      }
      return true;
  } else if (event.keyCode === 80 && currentGame.currentPlayer === 1) {
     currentGame.playCard();
     displayMiddleCard()
     show(middlePile);
     switchPlayers();
  } else if (event.keyCode === 74) {
      currentGame.whoSlapped = 1;
      if(currentGame.slap()) {
        hide(middlePile);
        displaySlapMessage();
      } else {
        displaySlapMessage();
      }
      return true;
  }
};

function playCard() {
  if(event.keyCode !== 81 && event.keyCode !== 80 && event.keyCode !== 70 && event.keyCode !== 74) {
    return;
  }
  else if(!checkEmptyHand()) {
    hide(message);
    validatePlayAction(event);
    hidePlayerPile();
    console.log(currentGame.middlePile);
} else {
  lastPlay(event);
}
};

function lastPlay(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 0) {
    winnerDealsPlayer0();
} else if( event.keyCode === 80 && currentGame.currentPlayer === 1) {
    winnerDealsPlayer1();
} else if(event.keyCode === 70 && currentGame.players[1].hand.length === 0) {
    winningSlapPlayer0();
} else if(event.keyCode === 74 && currentGame.players[0].hand.length === 0) {
    winningSlapPlayer1();
}
  redemptionSlap(event);
};

function winnerDealsPlayer0() {
  var playerHand0 = currentGame.players[0].hand;
  currentGame.playCard();
  displayMiddleCard();
    if(playerHand0.length === 0) {
       var cardsWon = currentGame.middlePile.splice(0);
       currentGame.players[0].hand = cardsWon;
       currentGame.players[0].shufflePlayerDeck();
    }
  //can refactor this out maybe
  currentGame.currentPlayer = 0;
};

function winnerDealsPlayer1() {
  var playerHand1 = currentGame.players[1].hand;
  currentGame.playCard();
  displayMiddleCard();
    if(playerHand1.length === 0) {
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[1].hand = cardsWon;
      currentGame.players[1].shufflePlayerDeck();
    }
  //can refactor this out maybe
  currentGame.currentPlayer = 1;
};

function winningSlapPlayer0() {
  currentGame.whoSlapped = 0;
  if(currentGame.slapJack()) {
    showWinningMessage("SLAPJACK", "player 1");
    currentGame.players[0].wins++;
    saveGame();
    gameReset();
  }
};

function winningSlapPlayer1() {
  currentGame.whoSlapped = 1;
    if(currentGame.slapJack()) {
      showWinningMessage("SLAPJACK", "player 2");
      currentGame.players[0].wins++;
      saveGame();
      gameReset();
    }
};

function redemptionSlap(event) {
  var playerHand0 = currentGame.players[0].hand;
  var playerHand1 = currentGame.players[1].hand;
  if(event.keyCode === 70 && playerHand0.length === 0) {
    redemptionAttemptPlayer0();
} else if(event.keyCode === 74 && playerHand1.length === 0) {
    redemptionAttemptPlayer1();
}
};

function redemptionAttemptPlayer0() {
  currentGame.whoSlapped = 0;
  if(currentGame.slapJack()) {
    show(playerPile1);
    showRedemptionMessage("player 1");
    currentGame.currentPlayer = 0;
} else {
    showWinningMessage("INVALID SLAP", "player 2");
    currentGame.players[1].wins++;
    saveGame();
    gameReset();
  }
};

function redemptionAttemptPlayer1() {
  currentGame.whoSlapped = 1;
  if(currentGame.slapJack()) {
    show(playerPile1);
    showRedemptionMessage("player 2");
    currentGame.currentPlayer = 1;
} else {
    showWinningMessage("INVALID SLAP", "player 1");
    currentGame.players[0].wins++;
    saveGame();
    gameReset();
  }
};

function gameReset() {
  if(localStorage.length === 0) {
    var player0 = new Player(0, 0);
    var player1 = new Player(0, 1);
    currentGame = new Game([player0, player1]);
    currentGame.shuffleDeck();
    currentGame.dealCards();
 } else {
    playAgain();
 }
};

function playAgain() {
  var savedPlayer0 = localStorage.getItem("0");
  var savedPlayer1 = localStorage.getItem("1");
  savedPlayer0 = JSON.parse(savedPlayer0);
  savedPlayer1 = JSON.parse(savedPlayer1);
  savedPlayer0 = new Player(savedPlayer0.wins, 0);
  savedPlayer1 = new Player(savedPlayer1.wins, 1);
  currentGame = new Game([savedPlayer0, savedPlayer1]);
  currentGame.shuffleDeck();
  currentGame.dealCards();
}

function saveGame() {
  for(var i = 0; i < 2; i++) {
    currentGame.players[i].saveToStorage();
  }
}
