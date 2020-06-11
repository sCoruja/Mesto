class Card {
  constructor(
    name,
    link,
    id,
    likes,
    owner,
    userId,
    popupCallback,
    likeCallback,
    deleteCallback
  ) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.likes = likes.map((like) => like._id);
    this._cardContainer = undefined;
    this._likeButton = undefined;
    this._likeCounter = undefined;
    this._removeButton = undefined;
    this._cardImage = undefined;
    this._clickHandler = popupCallback;
    this._likeHandler = likeCallback;
    this._deleteHandler = deleteCallback;
    this._userId = userId;
    this.isRemovable = owner._id === userId;
    this._isLiked = false;
  }

  create() {
    this._cardContainer = document.createElement("div");
    this._cardContainer.classList.add("place-card");
    this._cardImage = document.createElement("div");
    this._cardImage.classList.add("place-card__image");
    this._cardImage.style.backgroundImage = `url(${this.link})`;
    if (this.isRemovable) {
      this._removeButton = document.createElement("button");
      this._removeButton.addEventListener("click", this.remove.bind(this));
      this._cardImage.appendChild(this._removeButton);
      this._removeButton.classList.add("place-card__delete-icon");
    }
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("place-card__description");
    const cardName = document.createElement("h3");
    cardName.classList.add("place-card__name");
    cardName.textContent = this.name;
    this._likeButton = document.createElement("button");
    this._likeButton.classList.add("place-card__like-icon");
    if (this.likes.includes(this._userId)) {
      this._likeButton.classList.add("place-card__like-icon_liked");
      this._isLiked = true;
    }
    this._likeCounter = document.createElement("span");
    this._likeCounter.classList.add("place-card__like-counter");
    this._likeCounter.textContent = this.likes.length;

    const likeWrapper = document.createElement("div");
    likeWrapper.classList.add("place-card__like-wrapper");
    likeWrapper.appendChild(this._likeButton);
    likeWrapper.appendChild(this._likeCounter);

    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeWrapper);
    this._cardContainer.appendChild(this._cardImage);
    this._cardContainer.appendChild(cardDescription);

    this._likeButton.addEventListener("click", this.like.bind(this));
    this._cardImage.addEventListener("click", this._clickHandler);
    return this._cardContainer;
  }

  async like() {
    await this._likeHandler(this.id, this._isLiked);
    this._likeButton.classList.toggle("place-card__like-icon_liked");
    this.isliked = !this.isliked;
    if (this.isliked) {
      this._likeCounter.textContent -= -1;
    } else {
      this._likeCounter.textContent -= 1;
    }
  }

  async remove() {
    await this._deleteHandler(this.id);
    if (this.isRemovable)
      this._removeButton.removeEventListener("click", this.remove.bind(this));
    this._likeButton.removeEventListener("click", this.like.bind(this));
    this._cardImage.removeEventListener("click", this._clickHandler);
    this._cardContainer.remove();
  }
}
