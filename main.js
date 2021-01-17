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
    return true;
} else if(currentGame.players[1].hand.length === 0) {
    currentGame.currentPlayer = 0;
    return true;
}
  return false;
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
  console.log("TEST");
  if(!checkHand()) {
  validatePlayAction(event);
  console.log(currentGame.middlePile);
} else {
  lastPlay(event);
}
};


//if checkHand returns this function is called
// function lastPlay(event) {
//   var playerHand0 = currentGame.players[0].hand;
//   var playerHand1 = currentGame.players[1].hand;
//   //player 0
//   if(event.keyCode === 81 && currentGame.currentPlayer === 0) {
//       currentGame.playCard();
//       if(playerHand0.length === 0) {
//        var cards = currentGame.middlePile.splice(0);
//        currentGame.players[0].hand = cards;
//      }
//       currentGame.players[0].shufflePlayerDeck();
//       currentGame.currentPlayer = 0
//   } else if(event.keyCode === 70 && playerHand1.length === 0) {
//       currentGame.whoSlapped = 0
//       if(currentGame.slapJack()) {
//         currentGame.players[0].wins++;
//       } else {
//         currentGame.invalidSlap();
//       }
//   }
//   //player 1
//    else if (event.keyCode === 80 && currentGame.currentPlayer === 1) {
//      currentGame.playCard();
//        if(playerHand1.length === 0) {
//          var cards = currentGame.middlePile.splice(0);
//          currentGame.players[1].hand = cards
//       }
//        currentGame.players[1].shufflePlayerDeck();
//        currentGame.currentPlayer = 1
//   } else if (event.keyCode === 74 && playerHand0.length === 0) {
//       currentGame.whoSlapped = 1;
//         if(currentGame.slapJack()) {
//           currentGame.players[0].wins++;
//         } else {
//           currentGame.invalidSlap();
//         }
//   } else {
//     return false;
//   }
// }

function lastPlay(event) {
  if(event.keyCode === 81 && currentGame.currentPlayer === 0) {
    winnerDealsPlayer0();
    console.log(currentGame.middlePile);
} else if( event.keyCode === 80 && currentGame.currentPlayer === 1) {
    winnerDealsPlayer1();
    console.log(currentGame.middlePile);
} else if(event.keyCode === 70 && currentGame.players[1].hand.length = 0) {
    winningSlapPlayer0();
    console.log(currentGame.players);
} else if(event.keyCode === 74 && currentGame.players[0].hand.length = 0) {
    winningSlapPlayer1();
    console.log(currentGame.players);
}
}

//refactor winnerDeals()
function winnerDealsPlayer0() {
  var playerHand0 = currentGame.players[0].hand;
  currentGame.playCard();
    if(playerHand0.length === 0) {
       var cardsWon = currentGame.middlePile.splice(0);
       currentGame.players[0].hand = cardsWon;
       currentGame.players[0].shufflePlayerDeck();

   }
  currentGame.currentPlayer = 0
}

//refactor winnerDeals()
function winnerDealsPlayer1() {
  var playerHand1 = currentGame.players[1].hand;
  currentGame.playCard();
    if(playerHand1.length === 0) {
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[1].hand = cardsWon;
      currentGame.players[1].shufflePlayerDeck();
    }

  currentGame.currentPlayer = 1
}

  //refactor winningSlap()
  function winningSlapPlayer0() {
    currentGame.whoSlapped = 0
    if(currentGame.slapJack()) {
      currentGame.players[0].wins++;
    }
  }

  function winningSlapPlayer1() {
    currentGame.whoSlapped = 1;
      if(currentGame.slapJack()) {
        currentGame.players[0].wins++;
      } 
  }

  //If losing player slaps a jacks
  function redemptionSlap(event) {
    if(event.keycode === 70 && currentGame.players[0].hand === 0 && currentGame.slapJack()) {
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[0].hand = cards;
    } else if(event.keycode === 74 && currentGame.players[1].hand === 0 && currentGame.slapJack()) {
      var cardsWon = currentGame.middlePile.splice(0);
      currentGame.players[1].hand = cards;
    }
    }
