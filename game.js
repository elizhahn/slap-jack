var player1 = new Player(1);
var player2 = new Player(2);

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
    this.players = [player1, player2];
    this.currentPlayer = 0;
    this.middlePile = [];
  }
  shuffleDeck() {
    var shuffledCards = [];
    for(var i = 0; i < this.cards.length; i++) {
      var index = Math.floor(Math.random() * this.cards.length)
      shuffledCards.push(this.cards[index])
    }
    this.cards = shuffledCards;
  }
  dealCards() {
  var player1Cards = this.cards.splice(0, 26)
  var player2Cards = this.cards.splice(0)
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
}

var game = new Game();
