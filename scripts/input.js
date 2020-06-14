class Input {
  constructor(
    name,
    type,
    placeholder,
    minLength = 0,
    maxLength = 0,
    value = ""
  ) {
    this._name = name;
    this._type = type;
    this._placeholder = placeholder;
    this._minLength = minLength;
    this._maxLength = maxLength;
    this.value = value;
    this.inputElement = undefined;
    this.errorsElement = undefined;
  }
  render() {
    const formGroup = document.createElement("div");
    formGroup.classList.add("popup__form-group");
    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("popup__input");
    this.inputElement.setAttribute("name", this._name);
    this.inputElement.setAttribute("type", this._type);
    this.inputElement.setAttribute("id", this._id);
    this.inputElement.setAttribute("class", "popup__input");
    this.inputElement.setAttribute("required", "required");
    this.inputElement.setAttribute("placeholder", this._placeholder);
    if (this._minLength)
      this.inputElement.setAttribute("minLength", this._minLength);
    if (this._maxLength)
      this.inputElement.setAttribute("maxLength", this._maxLength);
    this.inputElement.setAttribute("value", this.value);
    this.errorsElement = document.createElement("span");
    this.errorsElement.classList.add("popup__error-message");
    formGroup.appendChild(this.inputElement);
    formGroup.appendChild(this.errorsElement);
    return formGroup;
  }
}
