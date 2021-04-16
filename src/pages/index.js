import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import {
  settingsApi,
  settingsValid,
  submitButtonsTexts,
  buttonEditProfile,
  buttonEditAvatar,
  buttonAddPhoto,
  popupUser,
  popupPlace,
  popupUserAvatar,
  popupProfileInputName,
  popupProfileInputJob,
} from "../scripts/utils/constants.js";

const popupFormValidUser = new FormValidator(settingsValid, popupUser);
const popupFormValidPlace = new FormValidator(settingsValid, popupPlace);
const popupFormValidAvatar = new FormValidator(settingsValid, popupUserAvatar);
popupFormValidUser.enableValidation();
popupFormValidPlace.enableValidation();
popupFormValidAvatar.enableValidation();

const api = new Api(settingsApi);
const popupImage = new PopupWithImage(".popup_type_image");
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about",
  userAvatarSelector: ".profile__avatar",
});

let cardToRemove = null;

function createCard(item, templateSelector) {
  const newCard = new Card(
    item,
    templateSelector,
    popupImage.openPopup.bind(popupImage),

    {
      handleRemoveClick: () => {
        popupRemove.openPopup();
        cardToRemove = newCard;
      },
      handleCardLike: () => {
        api
          .likeCard(newCard)
          .then((res) => newCard.setCounterOfLikes(res.likes.length))
          .catch((err) => alert(err));
      },
      handleCardDislike: () => {
        api
          .dislikeCard(newCard)
          .then((res) => newCard.setCounterOfLikes(res.likes.length))
          .catch((err) => alert(err));
      },
    },

    { id: userInfo.id }
  );

  return newCard.generateCard();
}

const placesList = new Section(
  {
    renderer: (item) => {
      const generatedCard = createCard(item, ".template");
      placesList.setItem(generatedCard, true);
    },
  },
  ".elements"
);

const promiseGetUser = api.getUser();
const promiseGetCards = api.getCards();

Promise.all([promiseGetUser, promiseGetCards])
  .then((arrayOfObjectsUserAndCards) => {
    userInfo.setUserInfo(arrayOfObjectsUserAndCards[0]);
    placesList.renderItems(arrayOfObjectsUserAndCards[1]);
  })
  .catch((err) => alert(err));

//Проверим наличие изображения на url-адресе
function checkImage(link) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = link;
    img.onload = resolve;
    img.onerror = reject;
  });
}

function addCardApi(formValues) {
  api
    .postCard({ name: formValues.place, link: formValues.link })
    .then((newCard) => {
      const generatedCard = createCard(newCard, ".template");
      placesList.setItem(generatedCard);
      popupCard.closePopup();
    })
    .catch((err) => alert(err));
}

const popupCard = new PopupWithForm({
  popupSelector: ".popup_type_place",
  submitButtonsTexts,
  handleFormSubmit: (formValues) => {
    checkImage(formValues.link)
      .then(() => {
        popupCard.changeSubmitButtonsText();
        addCardApi(formValues);
      })
      .catch(() => alert("Изображение не найдено. Введите корректный адрес"));
  },
});

function changeAvatarApi(formValues) {
  api
    .changeAvatar(formValues.link)
    .then((UserInfoObject) => {
      userInfo.setUserInfo(UserInfoObject);
      popupAvatar.closePopup();
    })
    .catch((err) => alert(err));
}

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitButtonsTexts,
  handleFormSubmit: (formValues) => {
    checkImage(formValues.link)
      .then(() => {
        popupAvatar.changeSubmitButtonsText();
        changeAvatarApi(formValues);
      })
      .catch(() => alert("Изображение не найдено. Введите корректный адрес"));
  },
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_user",
  submitButtonsTexts,
  handleFormSubmit: (formValues) => {
    popupProfile.changeSubmitButtonsText();
    api
      .patchUserInfo(formValues)
      .then((updatedUser) => {
        userInfo.setUserInfo(updatedUser);
        popupProfile.closePopup();
      })
      .catch((err) => alert(err));
  },
});

const popupRemove = new PopupWithForm({
  popupSelector: ".popup_type_remove",
  submitButtonsTexts,
  handleFormSubmit: () => {
    popupRemove.changeSubmitButtonsText();
    api
      .deleteCard(cardToRemove)
      .then(() => {
        cardToRemove.removeCard();
        popupRemove.closePopup();
      })
      .catch((err) => alert(err));
  },
});

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupRemove.setEventListeners();
popupAvatar.setEventListeners();

function setPopupProfileInputs() {
  popupProfileInputName.value = userInfo.getUserInfo().userName;
  popupProfileInputJob.value = userInfo.getUserInfo().userAbout;
}

function handleEditProfile() {
  popupFormValidUser.setPopupToInitialState();
  setPopupProfileInputs();
  popupProfile.openPopup();
}

function handleAddPhoto() {
  popupFormValidPlace.setPopupToInitialState();
  popupCard.openPopup();
}

function handleEditAvatar() {
  popupFormValidAvatar.setPopupToInitialState();
  popupAvatar.openPopup();
}

buttonEditProfile.addEventListener("click", handleEditProfile);
buttonAddPhoto.addEventListener("click", handleAddPhoto);
buttonEditAvatar.addEventListener("click", handleEditAvatar);
