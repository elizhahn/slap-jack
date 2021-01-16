//DOM SELECTORS-----------------------------


//EVENTLISTENERS------------------------------
//resetting game on load
  //pageload.addEventListner(load, resetGame);
//playing a card
  // document.addEventListener(keydown, playCard)
//slapping a card
  // document.addEventListern(keydown, slapCard)



//EVENT HANDLERS-----------------------------
//player losing all of their cards
    // create function that will check the player's decks before playCard() is called
    //if a player's hand is empty the current player will always be set to the other player
    // function checkHand() {
        //if(currentGame.player[0].hand.length === 0)
           //currentGame.currentPlayer = 1;
        //if(currentGame.player[1].hand.length === 0)
            //currentGame.currentPlayer = 0;


//PLAY CARD-------------------------------------
//function to set the currentPlayer..setCurrentPlayer(event)
  //if event.target === q
     //currentPlayer === 0
     //return true

  //if event.target === p
      //currentPlayer === 1
      //return true

  //else return false---invalid key was pressed



//playCard function is called when a keydown event occurs
  // if(!setCurrentPlayer(event))
     //maybe do an error message here...but not neccessary..
     //otherwise return; --to stop functionality

   //else if(setCurrentPlayer(event)--if returns true, then proper keys were hit and player is set.
      // checkHand() is called here to check if their hand is empty
      // if checkHand conditionals are met this function will ensure the player with the empty hand
      //is never set to currentPlayer
      //the playCard() method is now called on the currentGame: currentGame.playCard();
      // the currentPlayer will toggle back and forth normally if checkHand conditions are not met


//SLAPPING-------------------------------
//function to decipher who slapped setWhoSlapped(event)
//if event.target === f
   //currentGame.whoSlapped === 0
   //return true

//if event.target === j
    //currentGame.whoSlapped === 1
    //return true

//else return false---invalid key was pressed



//slapping a card function slapCard()
  //call setWhoSlapped(event) in a conditional to make sure a valid key was hit
  //and to also set currentGame.whoSlapped property
     //if(!setWhoSlapped(event))
     //return

     //if(setWhoSlapped(event))
     //call currentGame.slap()

// Player has one chance to win, must slap a jack? double check, also have to figure out how
//to tell if pile was rotated through once only
