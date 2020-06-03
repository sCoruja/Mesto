class Popup {
  constructor() {
    this._container = undefined;
    this._content = undefined;
    this._containerContent = undefined;
    this.popupCloseButton = undefined;
  }
  render() {
    this._container = document.createElement("div");
    this._container.classList.add("popup");
    this._containerContent = document.createElement("div");
    this._containerContent.classList.add("popup__content");

    this.popupCloseButton = document.createElement("img");
    this.popupCloseButton.classList.add("popup__close");
    this.popupCloseButton.setAttribute("src", "./images/close.svg");
    this._containerContent.appendChild(this.popupCloseButton);
    this._container.appendChild(this._containerContent);
    this.setEventListeners.bind(this)();

    return this._container;
  }
  open(content) {
    this._content = content;
    this._containerContent.appendChild(this._content);
    this.toggle();
  }
  close() {
    this._content.remove();
    this._content = undefined;
    this.toggle();
  }

  toggle() {
    this._container.classList.toggle("popup_is-opened");
  }
  setEventListeners() {
    const close = this.close.bind(this);
    this._container.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        close();
      }
    });
    this.popupCloseButton.addEventListener("click", function (e) {
        close();
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        if (this._container.classList.contains("popup_is-opened")) this.close();
      }
    });
  }
}
