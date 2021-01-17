class Player {
  constructor(id) {
    this.hand = [];
    this.wins = 0;
    this.id = id;
  }
  playCard() {
    var currentCard = this.hand.splice(-1);
    //push currentCard into middle deck array in Game class
    //will build out more functionality with Game class
    return currentCard[0];

  }
  saveToStorage() {
    var player = JSON.stringify(this);
    localStorage.setItem(this.id, player)
  }
  shufflePlayerDeck() {
    var shuffledCards = [];
    var playerCardAmount = this.hand.length;
    for(var i = 0; i < playerCardAmount; i++) {
      var index = Math.floor(Math.random() * this.hand.length)
      var randomCard = this.hand.splice(index, 1);
      shuffledCards.push(randomCard[0])
  }
    this.hand = shuffledCards;
 }
}
