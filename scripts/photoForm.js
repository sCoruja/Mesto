class PhotoForm extends Form {
  constructor(callback, inputConstructror) {
    super(
      [["link", "url", "Ссылка на аватар"]],
      "Сохранить",
      "Обновить аватар",
      callback,
      inputConstructror
    );
  }
}
