class Game {
  constructor(players) {
    this.cards = cards.slice(0);
    this.suits = suits;
    this.players = players;
    this.currentPlayer = 0;
    this.middlePile = [];
    this.whoSlapped = 0;
    this.slapType = "";
  }

  shuffleDeck() {
    var shuffledCards = [];
    for(var i = 0; i < 52; i++) {
      var index = Math.floor(Math.random() * this.cards.length);
      var randomCard = this.cards.splice(index, 1);
      shuffledCards.push(randomCard[0]);
    };
    this.cards = shuffledCards;
  };

  dealCards() {
    var player1Cards = this.cards.splice(0, 26);
    var player2Cards = this.cards.splice(0);
    this.players[0].hand = player1Cards;
    this.players[1].hand = player2Cards;
  };

  playCard() {
    if(this.currentPlayer === 0) {
      this.middlePile.push(this.players[0].playCard());
    } else {
      this.middlePile.push(this.players[1].playCard());
    }
  };

  slap(whoSlapped) {
    switch (true) {
      case this.slapJack(whoSlapped):
      this.slapType = "JACK";
      return true;
      case this.slapDouble(whoSlapped):
      this.slapType = "DOUBLE";
      return true;
      case this.slapSandwich(whoSlapped):
      this.slapType = "SANDWICH";
      return true;
      default:
      this.slapType = "INVALID";
      return false;
    }
  }
    slapJack(whoSlapped) {
      var lastCard = this.middlePile[this.middlePile.length - 1];
      var jacks = this.suits.jack;
      var cardsWon;
        if(jacks.includes(lastCard)) {
          cardsWon = this.middlePile.splice(0);
          this.players[whoSlapped].hand = [...this.players[whoSlapped].hand, ...cardsWon];
          this.players[whoSlapped].shufflePlayerDeck();
          return true;
    }
  }

  slapDouble(whoSlapped) {
    var cardsWon;
    var length = this.middlePile.length;
      for(var suit in this.suits) {
        var currentSuit = this.suits[suit];
          if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2])) {
            cardsWon = this.middlePile.splice(0);
            this.players[whoSlapped].hand = [...this.players[whoSlapped].hand, ...cardsWon];
            this.players[whoSlapped].shufflePlayerDeck();
            return true;
          }
       };
   };

   slapSandwich(whoSlapped){
    var cardsWon;
    var length = this.middlePile.length;
      for(var suit in this.suits) {
        var currentSuit = this.suits[suit];
          if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3])) {
            cardsWon = this.middlePile.splice(0);
            this.players[whoSlapped].hand = [...this.players[whoSlapped].hand, ...cardsWon];
            this.players[whoSlapped].shufflePlayerDeck();
            return true;
        }
      };
    };

  invalidSlap(whoSlapped) {
    var length = this.players[whoSlapped].hand.length;
    var topCard = this.players[whoSlapped].hand.splice(length - 1);
    this.players[whoSlapped].hand.unshift(topCard[0]);
 }
}
