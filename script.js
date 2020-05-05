'use strict';

const cardsContainer = document.querySelector(".places-list");
const popupContainer = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const popupShowButton = document.querySelector(".user-info__button");
const popupHideButton = document.querySelector(".popup__close");

function renderCard(name, link) {
  const card = document.createElement("div");
  card.classList.add("place-card");
  const cardImage = document.createElement("div");
  cardImage.classList.add("place-card__image");
  cardImage.style.backgroundImage = `url(${link})`
  // cardImage.setAttribute("style", `background-image: url(${link});`);
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

  return card;
}

function toggleForm() {
  popupContainer.classList.toggle("popup_is-opened");
}

function likeCard(event) {
  event.target.classList.toggle("place-card__like-icon_liked");
}

function addCard(card) {
  cardsContainer.appendChild(card);
}

function createCard(event) {
  event.preventDefault();
  if (popupForm.name.value && popupForm.link.value) {
    addCard(renderCard(popupForm.name.value, popupForm.link.value));
    popupForm.reset();
    toggleForm();
  }
}
function deleteCard(event) {
  if (event.target.classList.contains("place-card__delete-icon")) {
    event.currentTarget.removeEventListener("click", deleteCard);
    event.currentTarget
      .querySelector("button")
      .removeEventListener("click", likeCard);
    event.currentTarget.remove();
  }
}

popupShowButton.addEventListener("click", toggleForm);
popupHideButton.addEventListener("click", toggleForm);
popupForm.addEventListener("submit", createCard);

document.addEventListener("keyup", function (e) {
  if (
    // Отлично -- проверка открыта ли форма
    popupContainer.classList.contains("popup_is-opened") &&
    e.key === "Escape"
  )
    toggleForm();
});

function init() {
  initialCards.forEach((card) => addCard(renderCard(card.name, card.link)));
}

init();

// Здравствуйте!

// ## Итог

// - код работает, нет синтаксических и других ошибок
// - функционал, перечисленный в задании, работает (при перезагрузке на страницу добавляются
//   10 карточек, форма открывается и закрывается, можно добавить, удалить и лайкнуть карточку)
// - функционал работает без ошибок
// - карточку можно добавить нажав Enter, находясь в одном из текстовых полей
// - верное использование `let` и `const`
// - функции, декларированные как `function functionName() {}` не вызываются до того, как
//   были объявлены

// Работа принята


// Может быть интересно:
// Воспользуйтесь `<template>` -- https://developer.mozilla.org/ru/docs/Web/HTML/Element/template
// И `cloneNode` -- https://developer.mozilla.org/ru/docs/Web/API/Node/cloneNode
// для удобного тиражирования одинаковых объектов