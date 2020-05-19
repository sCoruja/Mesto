"use strict";

const cardsContainer = document.querySelector(".places-list");
const imagePopupContainer = document.querySelector(".image-popup");
const imagePopup = document.querySelector(".image-popup");
const closeImagePopupButton = document.querySelector(".image-popup__close");
const img = document.querySelector(".image-popup__image");

const toggleImage = (event) => {
  if (event.target === event.currentTarget) {
    const link = event.target.style.backgroundImage
      .replace('url("', "")
      .replace('")', ""); /* ¯\_(ツ)_/¯ */
    imagePopup.classList.toggle("popup-image_is-opened");
    img.setAttribute("src", link);
  }
};
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
  cardImage.addEventListener("click", toggleImage);
  return card;
};

const isLink = (link) => true;

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
    event.currentTarget
      .querySelector(".place-card__image")
      .removeEventListener("click", toggleImage);
    event.currentTarget.remove();
  }
};

const hideImage = (event) =>
  imagePopup.classList.toggle("popup-image_is-opened");

closeImagePopupButton.addEventListener("click", hideImage);
imagePopupContainer.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    hideImage();
  }
});

function init() {
  initialCards.forEach((card) => addCard(renderCard(card.name, card.link)));
}

init();

/*REVIEW по заданию 7. Резюме.

Работа неплохая, но прежде всего надо исправить ошибки, которые наглядно описаны в файле Readme.docx.


REVIEW2 по заданию 7. Резюме2.

Раздвоение форм исправлено. Рекомендации выполнены.

Но валидация форм так правильно и не работает.

Я рекомендую Вам ещё раз прочитать как должна работать валидация в описании задания, просмотреть видео и переписать функции валидации заново.
Я думаю это будет рациональней, чем искать ошибки в написанных функциях.

Какие неточности работы валидации обнаружила я, смотрите на снимках "Снимок экрана в 2020-05-18 23-50-09.png" и "Снимок экрана в 2020-05-19 00-07-40.png".
Наверняка этих неточностей больше.


*/