class CardList {
    constructor(container, initialList) {
      this._container = container;
      this._list = initialList;
    }
    addCard(card) {
      // this._list.push(card);
      /*
       Можно лучше:
       + Нет смысла добавлять в _list новые карточки
      */
      this._container.appendChild(card.create());
    }
    render() {
      this._list.forEach((card) => this.addCard(card));
      /*
       Можно лучше:
       + Передавать добавление карточки в addCard
      */
    }
  }
  