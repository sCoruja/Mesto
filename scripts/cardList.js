class CardList {
  constructor(container) {
    this._container = container;
    this._list = undefined;
  }
  init(cards){
    this._list = cards;
  }
  addCard(card) {
    this._container.appendChild(card.create());
  }
  render() {
    this._list.forEach((card) => this.addCard(card));
  }
}
