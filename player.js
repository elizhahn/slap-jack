class Player {
  constructor(wins, id) {
    this.hand = [];
    this.wins = wins;
    this.id = id;
  }
  playCard() {
    var currentCard = this.hand.splice(-1);
    return currentCard[0];
  };
  saveToStorage() {
    var player = JSON.stringify(this);
    localStorage.setItem(this.id, player);
  };
  shufflePlayerDeck() {
    var shuffledCards = [];
    var playerCardAmount = this.hand.length;
    for(var i = 0; i < playerCardAmount; i++) {
      var index = Math.floor(Math.random() * this.hand.length);
      var randomCard = this.hand.splice(index, 1);
      shuffledCards.push(randomCard[0]);
  }
    this.hand = shuffledCards;
  };
  playerCardCount() {
   var cardCount = this.hand.length
   return cardCount; 
 }
};
