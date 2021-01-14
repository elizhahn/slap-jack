
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
    return currentCard;

  }
  saveToStorage() {
    var player = JSON.stringify(this);
    localStorage.setItem(this.id, player)
  }
}
