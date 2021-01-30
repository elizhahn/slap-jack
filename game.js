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

  slap() {
    switch (true) {
      case this.slapJack():
      this.slapType = "JACK";
      return true;
      case this.slapDouble():
      this.slapType = "DOUBLE";
      return true;
      case this.slapSandwich():
      this.slapType = "SANDWICH";
      return true;
      case this.invalidSlap():
      this.slapType = "INVALID";
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
    };

    slapDouble() {
      var cardsWon;
      var length = this.middlePile.length;
        for(var suit in this.suits) {
          var currentSuit = this.suits[suit];
            if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2]) && this.whoSlapped === 0) {
              cardsWon = this.middlePile.splice(0);
              this.players[0].hand = [...this.players[0].hand, ...cardsWon];
              this.players[0].shufflePlayerDeck();
              return true;
            } else if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2]) && this.whoSlapped === 1) {
              cardsWon = this.middlePile.splice(0);
              this.players[1].hand = [...this.players[1].hand, ...cardsWon];
              this.players[1].shufflePlayerDeck();
              return true;
            }
         };
     };

     slapSandwich(){
      var cardsWon;
      var length = this.middlePile.length;
        for(var suit in this.suits) {
          var currentSuit = this.suits[suit];
            if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3]) && this.whoSlapped === 0) {
              cardsWon = this.middlePile.splice(0);
              this.players[0].hand = [...this.players[0].hand, ...cardsWon];
              this.players[0].shufflePlayerDeck();
              return true;
          } else if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3]) && this.whoSlapped === 1) {
              cardsWon = this.middlePile.splice(0);
              this.players[1].hand = [...this.players[1].hand, ...cardsWon];
              this.players[1].shufflePlayerDeck();
              return true;
          }
        };
      };

      invalidSlap() {
        if(this.whoSlapped === 0) {
          var length = this.players[0].hand.length;
          var topCard = this.players[0].hand.splice(length - 1);
          this.players[1].hand.unshift(topCard[0]);
      } else {
          var length = this.players[1].hand.length;
          var topCard = this.players[1].hand.splice(length - 1);
          this.players[0].hand.unshift(topCard[0]);
      }
      };
    };
