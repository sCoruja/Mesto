"use strict";

const popupContainer = document.querySelector(".popup");
const addCardButton = document.querySelector(".user-info__button");
const popupHideButton = document.querySelector(".popup__close");
const editProfileButton = document.querySelector(".user-info__edit-button");
let currentName = "Jaques Causteau";
let currentJob = "Sailor, Researcher";

const toggleForm = () => {
  popupContainer.classList.toggle("popup_is-opened");
};

const renderForm = (title, inputs, button, valid = false) => {
  const popup = document.createElement("div");
  popup.classList.add("popup__content");

  const popupClose = document.createElement("img");
  popupClose.classList.add("popup__close");
  popupClose.setAttribute("src", "./images/close.svg");
  popupClose.addEventListener("click", toggleForm);
  const popupTitle = document.createElement("h3");
  popupTitle.classList.add("popup__title");
  popupTitle.innerText = title;

  const form = document.createElement("form");
  form.classList.add("popup__form");
  form.setAttribute("name", "add");
  form.setAttribute("novalidate", "novalidate");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.className = "button button_size_big popup__button";
  submitButton.textContent = button;
  if (valid) {
    submitButton.classList.add("popup__button_active");
  }
  let inputElements = [];
  inputs.forEach((input) => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("popup__form-group");
    const inputElement = document.createElement("input");
    inputElement.classList.add("popup__input");
    Object.entries(input.attrs).forEach((attr) =>
      inputElement.setAttribute(attr[0], attr[1])
    );
    const errorsSpan = document.createElement("span");
    errorsSpan.classList.add("popup__error-message");
    inputElement.addEventListener("input", () => {
      if (inputElement.checkValidity()) {
        errorsSpan.textContent = "";
        if (form.checkValidity()){
        submitButton.classList.add("popup__button_active");
        }
      } else {
        if (inputElement.validity.valueMissing)
          errorsSpan.textContent = "Это обязательное поле";
        if (inputElement.validity.tooLong)
          errorsSpan.textContent = "Должно быть от 2 до 30 символов";
        if (inputElement.validity.tooShort)
          errorsSpan.textContent = "Должно быть от 2 до 30 символов";
        if (inputElement.validity.typeMismatch)
          errorsSpan.textContent = "Здесь должна быть ссылка";

        submitButton.classList.remove("popup__button_active");
      }
    });
    formGroup.appendChild(inputElement);
    formGroup.appendChild(errorsSpan);
    inputElements.push(formGroup);
  });

  form.append(...inputElements, submitButton);
  popup.append(popupClose, popupTitle, form);

  return {
    popup,
    form,
  };
};

const renderProfileForm = () => {
  return renderForm(
    "Редактировать профиль",
    [
      {
        attrs: {
          name: "name",
          type: "text",
          id: "name",
          class: "popup__input",
          placeholder: "Название",
          required: "required",
          minlength: "2",
          maxlength: "30",
          value: currentName,
        },
      },
      {
        attrs: {
          name: "job",
          type: "text",
          id: "job",
          class: "popup__input",
          placeholder: "Название",
          required: "required",
          minlength: "2",
          maxlength: "30",
          value: currentJob,
        },
      },
    ],
    "Сохранить",
    true
  );
};

const renderCardForm = () => {
  return renderForm(
    "Новое место",
    [
      {
        attrs: {
          name: "name",
          type: "text",
          id: "name",
          class: "popup__input",
          placeholder: "Название",
          required: "required",
          minlength: "2",
          maxlength: "30",
        },
      },
      {
        attrs: {
          name: "link",
          type: "url",
          id: "link",
          class: "popup__input",
          placeholder: "Ссылка на картинку",
          required: "required",
          // pattern: "~^(?:(?:https?|ftp|telnet)://(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:ru|su|com|net|org|mil|edu|arpa|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:/[a-z0-9.,_@%&?+=\~/-]*)?(?:#[^ '\"&]*)?$~i",
        },
      },
    ],
    "+"
  );
};

addCardButton.addEventListener("click", () => {
  const { popup, form } = renderCardForm();
  popupContainer.innerHTML = "";
  popupContainer.appendChild(popup);
  toggleForm();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      addCard(renderCard(form.name.value, form.link.value));
      toggleForm();
      form.reset();
    }
  });
});

editProfileButton.addEventListener("click", () => {
  const { popup, form } = renderProfileForm();
  popupContainer.innerHTML = "";
  popupContainer.appendChild(popup);
  toggleForm();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      const nameElement = document.querySelector(".user-info__name");
      const jobElement = document.querySelector(".user-info__job");
      nameElement.textContent = form.name.value;
      currentName = form.name.value;
      jobElement.textContent = form.job.value;
      currentJob = form.job.value;
      toggleForm();
      form.reset();
    }
  });
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    if (popupContainer.classList.contains("popup_is-opened")) toggleForm();
    if (imagePopup.classList.contains("popup-image_is-opened")) hideImage();
  }
});

popupContainer.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    toggleForm();
  }
});
