class CardList {
  constructor(container, initialList) {
    this._container = container;
    this._list = initialList;
  }
  addCard(card) {
    this._container.appendChild(card.create());
  }
  render() {
    this._list.forEach((card) => this.addCard(card));
  }
}
