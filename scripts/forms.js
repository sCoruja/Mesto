"use strict";

class Form {
  constructor(inputs, buttonText, title, callback) {
    this._inputs = inputs.map((input) => new Input(...input));
    this._button = undefined;
    this._title = title;
    this._buttonText = buttonText;
    this._form = undefined;
    this._isValid = false;
    this._submitCallback = callback;
    this._validator = new FormValidator(this);
  }
  render() {
    this._form = document.createElement("form");
    this._form.classList.add("popup__form");
    this._form.setAttribute("name", "add");
    this._form.setAttribute("novalidate", "novalidate");
    this._button = document.createElement("button");
    this._button.setAttribute("type", "submit");
    this._button.className = "button button_size_big popup__button";
    if (this._isValid) this._button.classList.add("popup__button_active");
    this._button.textContent = this._buttonText;
    const titleElement = document.createElement("h3");
    titleElement.classList.add("popup__title");
    titleElement.innerText = this._title;
    this._form.append(
      titleElement,
      ...this._inputs.map((input) => input.render()),
      this._button
    );
    return this._form;
  }

  submitForm(e) {
    e.preventDefault();
    if (this._isValid) {
      if (this._isValid) {
        this._submitCallback(
          ...this._inputs.map((input) => input.inputElement.value)
        );
      }
    } else {
      this._validator.checkInputValidity();
    }
  }
  setEventListeners() {
    this._form.addEventListener("submit", this.submitForm.bind(this));
    this._validator.setEventListeners();
  }
  removeEventListeners() {
    this._validator.removeEventListeners();
    this._form.removeEventListener("submit", this.submitForm.bind(this));
  }
}

class ProfileForm extends Form {
  constructor(name, job, callback) {
    super(
      [
        ["name", "text", "Название", "2", "30", name],
        ["job", "text", "Название", "2", "30", job],
      ],
      "Сохранить",
      "Редактировать профиль",
      callback
    );

    this._name = name;
    this._job = job;
    this._isValid = true;
  }
  render(name, job) {
    super.render();
    this._form.name.value = name;
    this._form.job.value = job;
    return this._form;
  }
}

class CardForm extends Form {
  constructor(callback) {
    super(
      [
        ["name", "text", "Название", "2", "30"],
        ["link", "url", "Ссылка на картинку"],
      ],
      "+",
      "Новое место",
      callback
    );
  }
}
