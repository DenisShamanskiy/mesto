const initialPlaces = [
  {
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1457885208630-7f09c8b8ba2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80'
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1435164205788-305635a36ec2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
  },
  {
    name: 'Дубай',
    link: 'https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80'
  },
  {
    name: 'Мадрид',
    link: 'https://images.unsplash.com/photo-1557675518-7b72340cc437?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1571850567059-c1c75ad541e6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80'
  }
];

const profile = document.querySelector('.profile');

const buttonEditProfile = profile.querySelector('.profile__button-edit')
const buttonAddPhoto = profile.querySelector('.profile__button-add-image')

const popupUser = document.querySelector('.popup_type_user');
const popupPlace = document.querySelector('.popup_type_place');

const popupFormUser = popupUser.querySelector('.popup__form');
const popupProfileInputName = popupFormUser.querySelector('.popup__form-input_type_name');
const popupProfileInputJob = popupFormUser.querySelector('.popup__form-input_type_job');

const settingValid = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  errorSelector: '.popup__form-input-error',
  inputErrorClass: 'popup__form-input_type_error',
  activeErrorClass: 'popup__form-input-error_active',
  activeInputErrorClass: '.popup__form-input-error_active',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  submitButtonSelector: '.popup__button-save',
  }

export {initialPlaces, settingValid, buttonEditProfile, buttonAddPhoto, popupUser, popupPlace, popupProfileInputName, popupProfileInputJob}
