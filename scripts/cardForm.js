class CardForm extends Form {
  constructor(callback) {
    super([
      ["name", "text", "Название", "2", "30"],
      ["link", "url", "Ссылка на картинку"],
    ].map((input) => new Input(...input)), "+", "Новое место", callback);
  }
}
