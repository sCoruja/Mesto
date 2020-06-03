class ProfileForm extends Form {
  constructor(name, job, callback) {
    super([
      ["name", "text", "Название", "2", "30", name],
      ["job", "text", "Название", "2", "30", job],
    ].map((input) => new Input(...input)), "Сохранить", "Редактировать профиль", callback);
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
