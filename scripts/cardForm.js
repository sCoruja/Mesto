class CardForm extends Form {
  constructor(callback, inputConstructror) {
    super(
      [
        ["name", "text", "Название", "2", "30"],
        ["link", "url", "Ссылка на картинку"],
      ],
      "+",
      "Новое место",
      callback,
      inputConstructror
    );
  }
}
