//DOM SELECTORS-----------------------------


//EVENTLISTENERS------------------------------
//resetting game on load
  //pageload.addEventListner(load, resetGame);
//playing a card
document.addEventListener("keydown", playCard);
//slapping a card
  // document.addEventListern(keydown, slapCard)

//GLOBAL VARIABLES
var player0 = new Player(0);
var player1 = new Player(1);
var currentGame = new Game([player0, player1]);

currentGame.shuffleDeck();
currentGame.dealCards();



//EVENT HANDLERS-----------------------------
function checkHand() {
  if(currentGame.players[0].hand.length === 0) {
    currentGame.currentPlayer = 1;
} else if(currentGame.players[1].hand.length === 0) {
    currentGame.currentPlayer = 0;
}
};

//Function to validate and execute any play Action
function validatePlayAction(event) {
  //player 0
  if(event.keyCode === 81 && currentGame.currentPlayer === 0) {
      currentGame.playCard();
      return true;
  } else if (event.keyCode === 70) {
      currentGame.whoSlapped = 0
      currentGame.slap();
      return true;
  }
  //player 1
   else if (event.keyCode === 80 && currentGame.currentPlayer === 1) {
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
  checkHand();
  validatePlayAction(event);
};
