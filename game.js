class Game {
  constructor(players) {
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
    this.players = players;
    this.currentPlayer = 1;
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
  }
  dealCards() {
    var player1Cards = this.cards.splice(0, 26);
    var player2Cards = this.cards.splice(0);
    this.players[0].hand = player1Cards;
    this.players[1].hand = player2Cards;
  }
  playCard() {
    if(this.currentPlayer === 1) {
      this.middlePile.push(this.players[0].playCard());
    } else {
      this.middlePile.push(this.players[1].playCard());
    }
  };
  slap() {
    if(this.slapJack()) {
        this.slapType = "JACK";
        return true;
  } else if(this.slapDouble()) {
        this.slapType = "DOUBLE";
        return true;
  } else if(this.slapSandwich()) {
        this.slapType = "SANDWICH";
        return true;
  } else {
        this.invalidSlap();
        this.slapType = "INVALID";
        return false;
  }
  };
    slapJack() {
      var lastCard = this.middlePile[this.middlePile.length - 1];
      var jacks = this.suits.jack;
      var cardsWon;
        if(jacks.includes(lastCard) && this.whoSlapped === 1) {
          cardsWon = this.middlePile.splice(0);
          this.players[0].hand = [...this.players[0].hand, ...cardsWon];
          this.players[0].shufflePlayerDeck();
          return true;
      } else if(jacks.includes(lastCard) && this.whoSlapped === 2) {
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
            if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2]) && this.whoSlapped === 1) {
              cardsWon = this.middlePile.splice(0);
              this.players[0].hand = [...this.players[0].hand, ...cardsWon];
              this.players[0].shufflePlayerDeck();
              return true;
            } else if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 2]) && this.whoSlapped === 2) {
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
            if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3]) && this.whoSlapped === 1) {
              cardsWon = this.middlePile.splice(0);
              this.players[0].hand = [...this.players[0].hand, ...cardsWon];
              this.players[0].shufflePlayerDeck();
              return true;
          } else if(currentSuit.includes(this.middlePile[length - 1]) && currentSuit.includes(this.middlePile[length - 3]) && this.whoSlapped === 2) {
              cardsWon = this.middlePile.splice(0);
              this.players[1].hand = [...this.players[1].hand, ...cardsWon];
              this.players[1].shufflePlayerDeck();
              return true;
          }
        };
      };
      invalidSlap() {
        if(this.whoSlapped === 1) {
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
