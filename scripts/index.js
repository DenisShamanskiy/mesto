import FormValidator from './FormValidator.js';
import {settingValid} from './settingValid.js';
import Card from './Card.js';

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

const elementsContainer = document.querySelector('.elements');

const body = document.querySelector('.body');

const popupUser = document.querySelector('.popup_type_user');                            /* Окно редактирования пользователя */
const popupPlace = document.querySelector('.popup_type_place');                          /* Окно добавления фото */
const popupImage = document.querySelector('.popup_type_image');                          /* Окно просмотра фото */

const profileEditBtn = document.querySelector('.profile__button-edit');                  /* Кнопка редактирования пользователя */
const imageAddBtn = document.querySelector('.profile__button-add-image');                /* Кнопка добавления фото */
const popupCloseBtn = document.querySelector('.popup__button-close');                    /* Кнопка закрытия окна редактирования пользователя*/
const popupCloseBtnPlace = document.querySelector('.popup__button-close_place');         /* Кнопка закрытия окна для добавления фото */
const popupCloseBtnImage = document.querySelector('.popup__button-close_image');         /* Кнопка закрытия окна для просмотра фото */

const profileName = document.querySelector('.profile__name');                            /* Имя пользователя на сайте */
const profileJob = document.querySelector('.profile__job');                              /* Профессия пользователя на сайте */
const inputName = document.querySelector('.popup__form-input_type_name');                /* Имя пользователя (input) */
const inputJob = document.querySelector('.popup__form-input_type_job');                  /* Профессия пользователя (input) */
const inputPlaceEl = document.querySelector('.popup__form-input_type_place');
const inputImageEl = document.querySelector('.popup__form-input_type_image');

const formSubmit = document.querySelector('.popup__form');                               /* Отправка формы */

const openPopupUser =  () => {openPopup(popupUser)}                                      /* Открыть окно редактирования пользователя */
const openPopupPlace = () => {openPopup(popupPlace)}                                     /* Открыть окно добавления фото */
const openPopupImage = () => {openPopup(popupImage)}                                     /* Открыть окно просмотра фото */

const closePopupUser = () => {closePopup(popupUser)}                                     /* Закрыть окно редактирования пользователя */
const closePopupPlace = () => {closePopup(popupPlace)}                                   /* Закрыть окно добавления фото */
const closePopupImage = () => {closePopup(popupImage)}                                   /* Закрыть окно просмотра фото */

const popupImageView = document.querySelector('.popup__photo');
const popupNameView = document.querySelector('.popup__caption');

const popupProfileFormValid = new FormValidator(settingValid, popupUser);
const popupCardFormValid = new FormValidator(settingValid, popupPlace);
popupProfileFormValid.enableValidation();
popupCardFormValid.enableValidation();



// Получить данные в поле (input) окна редактирования пользователя
function getInputValueProfile() {
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
}                                                                 

getInputValueProfile()

// Открыть Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  body.addEventListener('keydown', closePopupEsc)
  body.addEventListener('mousedown', closePopupMouse)

}

// Закрыть Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  body.removeEventListener('keydown', closePopupEsc)
  body.removeEventListener('mousedown', closePopupMouse)
}

// Закрыть Popup клавишей Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup) 
  }
}

// Закрыть Popup кликом в любом месте
function closePopupMouse(evt) {
  if (evt.target.classList.contains('popup_opened')) {closePopup(evt.target)}  
}

// Увеличить фото
function viewImage(name, link) {
  popupImageView.src = link;
  popupNameView.textContent = name;
  popupImageView.alt = name;
  openPopupImage();
}                                                                                      

// Создание карточек
function renderCards() {

  const cardsArray = initialPlaces.map((item) => {
    const newCard = new Card(item, '.template', viewImage);

    return newCard.generateCard();
  });
  elementsContainer.append(...cardsArray);
}

renderCards();

// Отправка формы редактирования пользователя
function submitFormUser (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    closePopupUser()
}                                                                                         

// Отправка формы добавления фото
function submitFormPlace(evt) {

  evt.preventDefault();
  const newCard = new Card({name:inputPlaceEl.value, link:inputImageEl.value},'.template', viewImage);
  elementsContainer.prepend(newCard.generateCard());
  closePopup(popupPlace);
}



profileEditBtn.addEventListener('click', openPopupUser)
imageAddBtn.addEventListener('click', openPopupPlace)

popupCloseBtn.addEventListener('click', closePopupUser)
popupCloseBtnPlace.addEventListener('click', closePopupPlace)
popupCloseBtnImage.addEventListener('click', closePopupImage)

formSubmit.addEventListener('submit', submitFormUser)
popupPlace.addEventListener('submit', submitFormPlace)