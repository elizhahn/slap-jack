//DOM SELECTORS-----------------------------


//EVENTLISTENERS------------------------------
//resetting game on load
  //pageload.addEventListner(load, resetGame);
//playing a card
document.addEventListener("keydown", playCard);
window.addEventListener("load", gameReset);

//GLOBAL VARIABLES
var currentGame;

function gameReset() {
  if(localStorage.length === 0) {
    var player0 = new Player(0);
    var player1 = new Player(1);
    currentGame = new Game([player0, player1]);
    currentGame.shuffleDeck();
    currentGame.dealCards();
 } else {
    var savedPlayer0 = localStorage.getItem("0");
    var savedPlayer1 = localStorage.getItem("1");
    savedPlayer0 = JSON.parse(savedPlayer0);
    savedPlayer1 = JSON.parse(savedPlayer1);
    currentGame = new Game([savedPlayer0, savedPlayer1]);
    currentGame.shuffleDeck();
    currentGame.dealCards();
 }
};


//EVENT HANDLERS-----------------------------
function checkHand() {
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
      return true;
  } else if(event.keyCode === 70) {
      currentGame.whoSlapped = 0;
      currentGame.slap();
      return true;
  } else if (event.keyCode === 80 && currentGame.currentPlayer === 1) {
     currentGame.playCard();
      return true;
  } else if (event.keyCode === 74) {
      currentGame.whoSlapped = 1;
      currentGame.slap();
      return true;
  } else {
    return false;
  }
};

function playCard() {
  console.log("TEST");
  if(!validatePlayAction(event)){
    return;
  }
  if(!checkHand()) {
    validatePlayAction(event);
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
    if(playerHand0.length === 0) {
       var cardsWon = currentGame.middlePile.splice(0);
       currentGame.players[0].hand = cardsWon;
       currentGame.players[0].shufflePlayerDeck();
    }
  currentGame.currentPlayer = 0;
};

function winnerDealsPlayer1() {
  var playerHand1 = currentGame.players[1].hand;
  currentGame.playCard();
    if(playerHand1.length === 0) {
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[1].hand = cardsWon;
      currentGame.players[1].shufflePlayerDeck();
    }
  currentGame.currentPlayer = 1;
};

function winningSlapPlayer0() {
  currentGame.whoSlapped = 0;
  if(currentGame.slapJack()) {
    currentGame.players[0].wins++;
    saveGame();
  }
};

function winningSlapPlayer1() {
  currentGame.whoSlapped = 1;
    if(currentGame.slapJack()) {
      currentGame.players[0].wins++;
      saveGame();
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
    currentGame.currentPlayer = 0;
} else {
    currentGame.players[1].wins++;
    saveGame();
  }
};

function redemptionAttemptPlayer1() {
  currentGame.whoSlapped = 1;
  if(currentGame.slapJack()) {
    currentGame.currentPlayer = 1;
} else {
    currentGame.players[0].wins++;
    saveGame();
  }
};

function saveGame() {
  for(var i = 0; i < 2; i++) {
    currentGame.players[i].saveToStorage();
  }
}
