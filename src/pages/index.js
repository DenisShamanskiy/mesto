import './index.css';
import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {initialPlaces, settingValid, buttonAddPhoto, buttonEditProfile, popupUser, popupPlace, popupProfileInputName, popupProfileInputJob} from '../scripts/utils/constants.js';

const popupFormValidUser = new FormValidator(settingValid, popupUser);
const popupFormValidPlace = new FormValidator(settingValid, popupPlace);
popupFormValidUser.enableValidation();
popupFormValidPlace.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_user',
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo(formValues);
    popupProfile.closePopup();
  }
});

const popupCard = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: (formValues) => {
    const generatedCard = createCard({name:formValues.place, link:formValues.image}, '.template');
    placesList.setItem(generatedCard);
    popupCard.closePopup();
  }
});



function createCard(item, templateSelector) {
  const newCard = new Card(item, templateSelector, popupImage.handleCardClick.bind(popupImage));

  return newCard.generateCard();
}

const placesList = new Section({
  data: initialPlaces,
  renderer: item => {
    const generatedCard = createCard(item, '.template');
    placesList.setItem(generatedCard, true);
  }
},'.elements');

placesList.renderItems();



function setPopupProfileInputs() {
  popupProfileInputName.value = userInfo.getUserInfo().userName;
  popupProfileInputJob.value = userInfo.getUserInfo().userJob;
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

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();

buttonEditProfile.addEventListener('click', handleEditProfile);
buttonAddPhoto.addEventListener('click', handleAddPhoto);