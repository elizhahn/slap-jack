var player1 = new Player(0);
var player2 = new Player(1);

class Game {
  constructor() {
    this.cards = [
    "card-deck-assets/blue-01.png",
    "card-deck-assets/blue-02.png",
    "card-deck-assets/blue-03.png",
    "card-deck-assets/blue-04.png",
    "card-deck-assets/blue-05.png",
    "card-deck-assets/blue-06.png",
    "card-deck-assets/blue-07.png",
    "card-deck-assets/blue-08.png",
    "card-deck-assets/blue-09.png",
    "card-deck-assets/blue-10.png",
    "card-deck-assets/blue-jack.png",
    "card-deck-assets/blue-queen.png",
    "card-deck-assets/blue-king.png",
    "card-deck-assets/gold-01.png",
    "card-deck-assets/gold-02.png",
    "card-deck-assets/gold-03.png",
    "card-deck-assets/gold-04.png",
    "card-deck-assets/gold-05.png",
    "card-deck-assets/gold-06.png",
    "card-deck-assets/gold-07.png",
    "card-deck-assets/gold-08.png",
    "card-deck-assets/gold-09.png",
    "card-deck-assets/gold-10.png",
    "card-deck-assets/gold-jack.png",
    "card-deck-assets/gold-queen.png",
    "card-deck-assets/gold-king.png",
    "card-deck-assets/green-01.png",
    "card-deck-assets/green-02.png",
    "card-deck-assets/green-03.png",
    "card-deck-assets/green-04.png",
    "card-deck-assets/green-05.png",
    "card-deck-assets/green-06.png",
    "card-deck-assets/green-07.png",
    "card-deck-assets/green-08.png",
    "card-deck-assets/green-09.png",
    "card-deck-assets/green-10.png",
    "card-deck-assets/green-jack.png",
    "card-deck-assets/green-queen.png",
    "card-deck-assets/green-king.png",
    "card-deck-assets/red-01.png",
    "card-deck-assets/red-02.png",
    "card-deck-assets/red-03.png",
    "card-deck-assets/red-04.png",
    "card-deck-assets/red-05.png",
    "card-deck-assets/red-06.png",
    "card-deck-assets/red-07.png",
    "card-deck-assets/red-08.png",
    "card-deck-assets/red-09.png",
    "card-deck-assets/red-10.png",
    "card-deck-assets/red-jack.png",
    "card-deck-assets/red-queen.png",
    "card-deck-assets/red-king.png"
    ];
    this.suits = {
    "1" : ["card-deck-assets/gold-01.png", "card-deck-assets/blue-01.png", "card-deck-assets/green-01.png","card-deck-assets/red-01.png"],
    "2" : ["card-deck-assets/blue-02.png", "card-deck-assets/gold-02.png", "card-deck-assets/green-02.png", "card-deck-assets/red-02.png"],
    "3" : [ "card-deck-assets/blue-03.png", "card-deck-assets/gold-03.png", "card-deck-assets/green-03.png", "card-deck-assets/red-03.png"],
    "4" : ["card-deck-assets/blue-04.png", "card-deck-assets/gold-04.png", "card-deck-assets/green-04.png", "card-deck-assets/red-04.png"],
    "5" : ["card-deck-assets/blue-05.png", "card-deck-assets/gold-05.png", "card-deck-assets/green-05.png", "card-deck-assets/red-05.png"],
    "6" : ["card-deck-assets/gold-06.png", "card-deck-assets/blue-06.png", "card-deck-assets/green-06.png", "card-deck-assets/red-06.png"],
    "7" : ["card-deck-assets/gold-07.png", "card-deck-assets/blue-07.png", "card-deck-assets/green-07.png", "card-deck-assets/red-07.png"],
    "8" : ["card-deck-assets/blue-08.png", "card-deck-assets/gold-08.png", "card-deck-assets/green-08.png", "card-deck-assets/red-08.png"],
    "9" : ["card-deck-assets/blue-09.png", "card-deck-assets/gold-09.png", "card-deck-assets/green-09.png", "card-deck-assets/red-09.png"],
    "10" :["card-deck-assets/blue-10.png", "card-deck-assets/gold-10.png", "card-deck-assets/green-10.png", "card-deck-assets/red-10.png"],
    "jack":["card-deck-assets/blue-jack.png", "card-deck-assets/gold-jack.png", "card-deck-assets/green-jack.png", "card-deck-assets/red-jack.png"],
    "queen" :["card-deck-assets/blue-queen.png","card-deck-assets/gold-queen.png","card-deck-assets/green-queen.png", "card-deck-assets/red-queen.png"],
    "king" : ["card-deck-assets/blue-king.png", "card-deck-assets/gold-king.png", "card-deck-assets/green-king.png", "card-deck-assets/red-king.png"]
    }
    this.players = [player1, player2];
    this.currentPlayer = 0;
    this.whoSlapped = 0;
    this.middlePile = [];
  }
  shuffleDeck() {
    var shuffledCards = [];
    for(var i = 0; i < 52; i++) {
      var index = Math.floor(Math.random() * this.cards.length)
      var randomCard = this.cards.splice(index, 1);
      shuffledCards.push(randomCard[0])

    }
    this.cards = shuffledCards;
  }
  dealCards() {
  var player1Cards = this.cards.splice(0, 26);
  var player2Cards = this.cards.splice(0);
  this.players[0].hand = player1Cards;
  this.players[1].hand = player2Cards;
  }
  playCard() {
    if(this.currentPlayer === 0) {
      this.middlePile.push(this.players[0].playCard());
      this.currentPlayer = 1;
    } else {
      this.middlePile.push(this.players[1].playCard());
      this.currentPlayer = 0;
    }
    //update currentCard that is in play for the DOM
// call updateMiddleCard();
// pass in argument that points to middle Card. grab
//from array middlePile
//this.middlePile[-1]

  }
  //In main.js, will listen for keydown condition on specific keys.
  //eventListner keydown
  //then I have a function attemptSlap() {
     //if event.target === f: Player 0
         //update currentGame.whoSlapped = 0
         //currentGame.slap();
     //if event.target === j: Player 1
  //

  //Using event.target, can decide if it was player 0 or player 1 based on keydown event.
  //Using a conditional Player 0: if(event.target === f) Player 1: if(event.target === j) then set the current player in that function that can then
  //be filtered in the method's conditional. So if event.target = f then
  slap() {
    //set the win conditions and return true
    // in  main.js use a function attached to keypress that will call
    //this method, use the true/false returns to use in the DOM.

    //if slap hits a Jack
    //middle pile goes to player who caused the keypress event
    //return true
    // this.slapJack();
      if(this.slapJack()) {
        return true;
    } else if(this.slapDouble()) {
        return true;
    } else if(this.slapSandwich()) {
        return true;
    } else {
        this.invalidSlap();
        return false;
   }
  }
    slapJack() {
    var lastCard = this.middlePile[this.middlePile.length - 1];
    var jacks = this.suits.jack;
    var cardsWon;
      if(jacks.includes(lastCard) && this.whoSlapped === 0) {
        cardsWon = this.middlePile.splice(0);
        this.players[0].hand = [...this.players[0].hand, ...cardsWon];
        this.players[0].shufflePlayerDeck();
        return true;
      } else if(jacks.includes(lastCard) && this.whoSlapped === 1) {
        cardsWon = this.middlePile.splice(0);
        this.players[1].hand = [...this.players[1].hand, ...cardsWon];
        this.players[1].shufflePlayerDeck();
        return true;
      }
  }
    slapDouble() {
    var cardsWon;
    var length = this.middlePile.length;
    for(var suit in this.suits) {
      var currentSuit = this.suits[suit];
      if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2])) {
        cardsWon = this.middlePile.splice(0);
        this.players[0].hand = [...this.players[0].hand, ...cardsWon];
        return true;
      } else if(currentSuit.includes(this.middlePile[length - 1] && currentSuit.includes(this.middlePile[length - 2])) && this.whoSlapped === 1){
        cardsWon = this.middlePile.splice(0);
        this.players[1].hand = [...this.players[1].hand, ...cardsWon];
        return true;
      }
    }
  }
     slapSandwich(){
      var cardsWon;
      var length = this.middlePile.length;
      for(var suit in this.suits) {
        var currentSuit = this.suits[suit];
        if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3]) && this.whoSlapped === 0) {
          cardsWon = this.middlePile.splice(0);
          this.players[0].hand = [...this.players[0].hand, ...cardsWon];
          return true;
        } else if(suit.includes(this.middlePile[length - 1] && this.middlePile[length - 3]) && this.whoSlapped === 1) {
          cardsWon = this.middlePile.splice(0);
          this.players[1].hand = [...this.players[1].hand, ...cardsWon];
          return true;
        }
       }
      }
      invalidSlap() {
        //if currentGame.slap() returns false then execute this method in main.js
        if(this.whoSlapped === 0) {
          var length = this.players[0].hand.length;
          var topCard = this.players[0].hand.splice(length - 1);
          this.players[1].hand.unshift(topCard[0]);
      } else {
          var length = this.players[1].hand.length;
          var topCard = this.players[1].hand.splice(length - 1);
          this.players[0].hand.unshift(topCard[0]);
    }
  }
}



var game = new Game();
