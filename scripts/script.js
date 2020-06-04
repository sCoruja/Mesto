"use strict";
const rootElement = document.querySelector(".root");
const addCardButton = document.querySelector(".user-info__button");
const editProfileButton = document.querySelector(".user-info__edit-button");

const cards = initialCards.map(
  (card) => new Card(card.name, card.link, openImage)
);
const cardListContainer = document.querySelector(".places-list");
const cardList = new CardList(cardListContainer, cards);

const userInfo = new UserInfo(
  "Jaques Causteau",
  "Sailor, Researcher",
  document.querySelector(".user-info__name"),
  document.querySelector(".user-info__job")
);
const profileForm = new ProfileForm(
  userInfo.name,
  userInfo.job,
  updateUserInfo,
  createInputs
);
profileForm.setValidator(new FormValidator(profileForm));
const cardForm = new CardForm(addCard, createInputs);
cardForm.setValidator(new FormValidator(cardForm));
const popup = new Popup();

function openImage(e) {
  if (e.target.className === "place-card__image") {
    let img = document.createElement("img");
    let url = e.target.style.backgroundImage
      .split("")
      .slice(4, -1)
      .join("")
      .replace('"', "");
    img.setAttribute("src", url.replace('"', ""));
    popup.open(img);
  }
}
function createInputs(inputs) {
  return inputs.map((input) => new Input(...input));
}
function addCard(name, link) {
  cardList.addCard(new Card(name, link, openImage));
  popup.close();
}
function updateUserInfo(name, job) {
  userInfo.setUserInfo(name, job);
  popup.close();
}
function renderProfileForm() {
  document.activeElement.blur(); // исправил баг: если открыть форму и нажать Enter, кнопка открытия формы нажмётся еще раз
  popup.open(profileForm.render(userInfo.name, userInfo.job));
  profileForm.setEventListeners();
}

function renderCardForm() {
  document.activeElement.blur();
  popup.open(cardForm.render());
  cardForm.setEventListeners();
}

cardList.render(openImage);
rootElement.appendChild(popup.render());
editProfileButton.addEventListener(
  "click",
  renderProfileForm.bind(profileForm)
);
addCardButton.addEventListener("click", renderCardForm.bind(cardForm));
// cardListContainer.addEventListener("click", openImage);

/*
  Что понравилось:
  - Код структурирован
  - Используются все нужные классы
  Можно лучше:
  + Удалить неиспользуемые переменные
  Надо исправить:
  + После первого добавления карточки, появляется возможность добавлять карточку с пустыми инпутами
  + Слушатель открытия попапа с картинкой должен назначаться внутри класса Card
  - Вынести классы из Form в отдельные файлы
  - Внутри классов нельзя создавать инстансы других классов
  + Внутри классов нельзя искать по document, все элементы должны передаваться в параметрах
*/