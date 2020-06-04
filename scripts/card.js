class Card {
  constructor(name, link, callback) {
    this.name = name;
    this.link = link;
    this._cardContainer = undefined;
    this._likeButton = undefined;
    this._removeButton = undefined;
    this._cardImage = undefined;
    this._clickHandler = callback;
  }

  create() {
    this._cardContainer = document.createElement("div");
    this._cardContainer.classList.add("place-card");
    this._cardImage = document.createElement("div");
    this._cardImage.classList.add("place-card__image");
    this._cardImage.style.backgroundImage = `url(${this.link})`;
    this._removeButton = document.createElement("button");
    this._removeButton.classList.add("place-card__delete-icon");
    this._cardImage.appendChild(this._removeButton);
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("place-card__description");
    const cardName = document.createElement("h3");
    cardName.classList.add("place-card__name");
    cardName.textContent = this.name;
    this._likeButton = document.createElement("button");
    this._likeButton.classList.add("place-card__like-icon");
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(this._likeButton);
    this._cardContainer.appendChild(this._cardImage);
    this._cardContainer.appendChild(cardDescription);
    this._removeButton.addEventListener("click", this.remove.bind(this));
    this._likeButton.addEventListener("click", this.like.bind(this));
    this._cardImage.addEventListener("click", this._clickHandler);
    return this._cardContainer;
  }

  like() {
    this._likeButton.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this._removeButton.removeEventListener("click", this.remove.bind(this));
    this._likeButton.removeEventListener("click", this.like.bind(this));
    this._cardImage.removeEventListener("click", this._clickHandler);
    this._cardContainer.remove();
  }
}
