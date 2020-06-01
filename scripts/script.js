"use strict";
const rootElement = document.querySelector(".root");
const addCardButton = document.querySelector(".user-info__button");
const editProfileButton = document.querySelector(".user-info__edit-button");

const cards = initialCards.map((card) => new Card(card.name, card.link));
const cardListContainer = document.querySelector(".places-list");
const cardList = new CardList(cardListContainer, cards);

const userInfo = new UserInfo("Jaques Causteau", "Sailor, Researcher");
const profileForm = new ProfileForm(
  userInfo.name,
  userInfo.job,
  updateUserInfo
);
const cardForm = new CardForm(addCard);
const popup = new Popup();

function addCard(name, link) {
  cardList.addCard(new Card(name, link));
  popup.close();
}
function updateUserInfo(name, job) {
  userInfo.setUserInfo(name, job);
  popup.close();
}
function renderProfileForm() {
  popup.open(profileForm.render(userInfo.name, userInfo.job));
  profileForm.setEventListeners();
}

function renderCardForm() {
  popup.open(cardForm.render());
  cardForm.setEventListeners();
}
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

cardList.render();
rootElement.appendChild(popup.render());
editProfileButton.addEventListener(
  "click",
  renderProfileForm.bind(profileForm)
);
addCardButton.addEventListener("click", renderCardForm.bind(cardForm));
cardListContainer.addEventListener("click", openImage);
