class FormValidator {
  constructor(form) {
    this._form = form;
  }
  checkInputValidity() {
    this._form._inputs.forEach((input) => {
      const inputElement = input.inputElement;
      if (inputElement.checkValidity()) {
        input.errorsElement.textContent = "";
      } else {
        if (inputElement.validity.valueMissing)
          input.errorsElement.textContent = "Это обязательное поле";
        if (inputElement.validity.tooLong)
          input.errorsElement.textContent = "Должно быть от 2 до 30 символов";
        if (inputElement.validity.tooShort)
          input.errorsElement.textContent = "Должно быть от 2 до 30 символов";
        if (inputElement.validity.typeMismatch)
          input.errorsElement.textContent = "Здесь должна быть ссылка";
      }
    });
  }
  setSubmitButtonState() {
    this._form._isValid = this._form._form.checkValidity();
    if (this._form._isValid) {
      this._form._button.classList.add("popup__button_active");
    } else {
      this._form._button.classList.remove("popup__button_active");
    }
  }
  validateForm() {
    this.checkInputValidity();
    this.setSubmitButtonState();
  }
  setEventListeners() {
    this._form._inputs.forEach((input) => {
      input.inputElement.addEventListener(
        "input",
        this.validateForm.bind(this)
      );
    });
  }
  removeEventListeners() {
    this._form._inputs.forEach((input) => {
      input.inputElement.removeEventListener(
        "input",
        this.validateForm.bind(this)
      );
    });
  }
}
