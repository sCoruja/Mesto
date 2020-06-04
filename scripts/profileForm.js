class ProfileForm extends Form {
  constructor(name, job, callback, inputConstructror) {
    super(
      [
        ["name", "text", "Название", "2", "30", name],
        ["job", "text", "Название", "2", "30", job],
      ],
      "Сохранить",
      "Редактировать профиль",
      callback,
      inputConstructror,
    );
    /*
      Можно лучше:
      + Убрать неиспользуемую переменную
    */
  }
  render(name, job) {
    super.render();
    this._form.name.value = name;
    this._form.job.value = job;
    return this._form;
  }
}
