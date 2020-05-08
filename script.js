"use strict";

const cardsContainer = document.querySelector(".places-list");
const popupContainer = document.querySelector(".popup");
const popupForm = {
  form: document.querySelector(".popup__form"),
  heading: document.querySelector(".popup__title"),
  nameInput: document.querySelector(".popup__input_type_name"),
  linkInput: document.querySelector(".popup__input_type_link-url"),
  button: document.querySelector(".popup__button"),
};
const showAddCardFormButton = document.querySelector(".user-info__button");
const popupHideButton = document.querySelector(".popup__close");
const editProfileButton = document.querySelector(".user-info__edit-button");
const imagePopup = document.querySelector(".image-popup");
const closeImagePopupButton = document.querySelector(".image-popup__close");
const renderCard = (name, link) => {
  const card = document.createElement("div");
  card.classList.add("place-card");
  const cardImage = document.createElement("div");
  cardImage.classList.add("place-card__image");
  cardImage.style.backgroundImage = `url(${link})`;
  const deleteIcon = document.createElement("button");
  deleteIcon.classList.add("place-card__delete-icon");
  cardImage.appendChild(deleteIcon);
  const cardDescription = document.createElement("div");
  cardDescription.classList.add("place-card__description");
  const cardName = document.createElement("h3");
  cardName.classList.add("place-card__name");
  cardName.textContent = name;
  const likeButton = document.createElement("button");
  likeButton.classList.add("place-card__like-icon");
  cardDescription.appendChild(cardName);
  cardDescription.appendChild(likeButton);
  card.appendChild(cardImage);
  card.appendChild(cardDescription);
  card.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  const img = document.querySelector(".image-popup__image");
  const toggleImage = (event) => {
    imagePopup.classList.toggle("popup-image_is-opened");
    img.setAttribute("src", link);
  };
  cardImage.addEventListener("click", toggleImage);
  return card;
};

const toggleForm = () => popupContainer.classList.toggle("popup_is-opened");
const renderForm = (heading, firstInput, secondInput, button) => {
  popupForm.heading.textContent = heading;
  popupForm.nameInput.setAttribute("placeholder", firstInput);
  popupForm.linkInput.setAttribute("placeholder", secondInput);
  popupForm.button.textContent = button;
  toggleForm();
};

const submitCardForm = (event) => {
  event.preventDefault();
  if (popupForm.form.name.value && popupForm.form.link.value) {
    addCard(renderCard(popupForm.form.name.value, popupForm.form.link.value));
    popupForm.form.reset();
    toggleForm();
    popupForm.form.removeEventListener("submit", submitCardForm);
  }
};

const renderCardForm = () => {
  renderForm("Новое место", "Название", "Ссылка на картинку", "+");
  popupForm.form.addEventListener("submit", submitCardForm);
};

const submitProfileEditForm = (event) => {
  event.preventDefault();
  const name = popupForm.form.name.value;
  const job = popupForm.form.link.value;
  if (name && job) {
    const nameElement = document.querySelector(".user-info__name");
    const jobElement = document.querySelector(".user-info__job");
    nameElement.textContent = name;
    jobElement.textContent = job;
    popupForm.form.reset();
    toggleForm();
  }
  popupForm.form.removeEventListener("submit", submitProfileEditForm);
};

const renderProfileEditForm = () => {
  renderForm("Редактировать профиль", "Имя", "Описание", "Сохранить");
  const nameElement = document.querySelector(".user-info__name");
  const jobElement = document.querySelector(".user-info__job");
  popupForm.form.name.value = nameElement.textContent;
  popupForm.form.link.value = jobElement.textContent;
  popupForm.form.addEventListener("submit", submitProfileEditForm);
};
const likeCard = (event) =>
  event.target.classList.toggle("place-card__like-icon_liked");

const addCard = (card) => cardsContainer.appendChild(card);

const createCard = (event) => {
  event.preventDefault();
  if (popupForm.form.name.value && popupForm.form.link.value) {
    addCard(renderCard(popupForm.form.name.value, popupForm.form.link.value));
    popupForm.form.reset();
    toggleForm();
  }
};
const deleteCard = (event) => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    event.currentTarget.removeEventListener("click", deleteCard);
    event.currentTarget
      .querySelector("button")
      .removeEventListener("click", likeCard);
    event.currentTarget.remove();
  }
};

const hideImage = (event) =>
imagePopup.classList.toggle("popup-image_is-opened");

closeImagePopupButton.addEventListener("click", hideImage);
showAddCardFormButton.addEventListener("click", renderCardForm);
editProfileButton.addEventListener("click", renderProfileEditForm);
popupHideButton.addEventListener("click", toggleForm);
document.addEventListener("keyup", function (e) {
  if (
    popupContainer.classList.contains("popup_is-opened") &&
    e.key === "Escape"
  )
    toggleForm();
});
function init() {
  initialCards.forEach((card) => addCard(renderCard(card.name, card.link)));
}

init();
