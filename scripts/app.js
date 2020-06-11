class App {
  constructor() {
    // DOM elements
    this.rootElement = document.querySelector(".root");
    this.addCardButton = document.querySelector(".user-info__button");
    this.editProfileButton = document.querySelector(".user-info__edit-button");
    this.cardListContainer = document.querySelector(".places-list");
    this.userNameElement = document.querySelector(".user-info__name");
    this.userDescriptionElement = document.querySelector(".user-info__job");
    this.userPhotoElement = document.querySelector(".user-info__photo");

    this.user = undefined;
    this.cards = new CardList(this.cardListContainer);
    this.popup = new Popup();
    this.api = new Api(
      `https://praktikum.tk/${COHORT ? COHORT : "cohort11"}`,
      TOKEN
    );

    this.profileForm = undefined;
    this.cardForm = undefined;
    this.photoForm = undefined;
  }

  showCardForm() {
    document.activeElement.blur();
    if (this.cardForm) this.cardForm.removeEventListener();
    this.cardForm = new CardForm(this.addCard.bind(this), (inputs) =>
      inputs.map((input) => new Input(...input))
    );
    this.cardForm.setValidator(new FormValidator(this.cardForm));
    this.popup.open(this.cardForm.render());
    this.cardForm.setEventListeners();
  }
  async addCard(name, link) {
    const card = await this.api.createCard({ name, link });
    this.cards.addCard(
      new Card(
        card.name,
        card.link,
        card._id,
        card.likes,
        card.owner,
        this.user.id,
        this.showImagePopup,
        this.likeCard,
        this.removeCard
      )
    );
    this.popup.close();
  }
  showImagePopup(event) {
    if (event.target.className === "place-card__image") {
      const img = document.createElement("img");
      img.classList.add('popup__image')
      const url = event.target.style.backgroundImage
        .split("")
        .slice(4, -1)
        .join("")
        .replace('"', "");
      img.setAttribute("src", url.replace('"', ""));
      this.popup.open(img);
    }
  }

  // callbacks for Card class
  async removeCard(id) {
    if(window.confirm('Are you sure?'))
    await this.api.deleteCard(id);
  }
  async likeCard(id, isLiked) {
    await this.api.likeCard(id, isLiked);
  }

  showUserForm() {
    if (this.profileForm) this.profileForm.removeEventListener();
    this.profileForm = new ProfileForm(
      this.user.name,
      this.user.job,
      this.updateUserInfo.bind(this),
      (inputs) => inputs.map((input) => new Input(...input))
    );
    this.profileForm.setValidator(new FormValidator(this.profileForm));
    document.activeElement.blur();
    this.popup.open(this.profileForm.render(this.user.name, this.user.job));
    this.profileForm.setEventListeners();
  }

  async updateUserInfo(name, about) {
    const user = await this.api.updateUserInfo({ name, about });
    this.user.setUserInfo(user.name, user.about);

    this.popup.close();
  }

  async updateUserAvatar(avatar) {
    const user = await this.api.updateUserAvatar({ avatar });
    this.user.setUserAvatar(user.avatar);
    this.popup.close();
  }
  showPhotoForm() {
    if (this.photoForm) this.photoForm.removeEventListener();
    this.photoForm = new PhotoForm(
      this.updateUserAvatar.bind(this),
      (inputs) => inputs.map((input) => new Input(...input))
    );
    this.photoForm.setValidator(new FormValidator(this.photoForm));
    document.activeElement.blur();
    this.popup.open(this.photoForm.render());
    this.photoForm.setEventListeners();
  }

  setEventListeners() {
    this.addCardButton.addEventListener("click", this.showCardForm.bind(this));
    this.editProfileButton.addEventListener(
      "click",
      this.showUserForm.bind(this)
    );
    this.userPhotoElement.addEventListener("click", this.showPhotoForm.bind(this));
  }
  async init() {
    // получение информации о пользователе
    const user = await this.api.getUserInfo();
    this.user = new UserInfo(
      user.name,
      user.about,
      user.avatar,
      user._id,
      this.userNameElement,
      this.userDescriptionElement,
      this.userPhotoElement
    );
    this.user.updateUserInfo();
    // добавления блока для попапа
    this.rootElement.appendChild(this.popup.render());
    // получение списка начальных карточек
    const cards = [];
    (await this.api.getCards()).forEach((card) => {
      cards.push(
        new Card(
          card.name,
          card.link,
          card._id,
          card.likes,
          card.owner,
          this.user.id,
          this.showImagePopup.bind(this),
          this.likeCard.bind(this),
          this.removeCard.bind(this)
        )
      );
    });
    this.cards.init(cards);
    this.cards.render();
  }
  run() {
    this.init.call(this);
    this.setEventListeners();
  }
}
