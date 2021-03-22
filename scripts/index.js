import FormValidator from './FormValidator.js';
import {settingValid} from './settingValid.js';
import Card from './Card.js';



const elementsContainer = document.querySelector('.elements');

const body = document.querySelector('.body');

const popupUser = document.querySelector('.popup_type_user');                            /* Окно редактирования пользователя */
const popupPlace = document.querySelector('.popup_type_place');                          /* Окно добавления фото */
const popupImage = document.querySelector('.popup_type_image');                          /* Окно просмотра фото */


const popupPlaceForm = document.querySelector('.popup__form_place');

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

// Создание карточки при отправке формы добавления фото
function createCard() {
  const newCard = new Card({name:inputPlaceEl.value, link:inputImageEl.value},'.template', viewImage);
  return newCard
}

initialPlaces.forEach((item) => {
  const cardElement = new Card(item, '.template', viewImage).generateCard();
  elementsContainer.append(cardElement);
});

// Отправка формы редактирования пользователя
function submitFormUser (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    closePopupUser()
}

// Изменить профиль
function openEditProfilePopup() {
  popupProfileFormValid.clearPopup();
  getInputValueProfile()
  openPopup(popupUser);
}

// Добавить фото
function openAddCardPopup() {
  popupCardFormValid.clearPopup();
  popupCardFormValid.setPopupCardSubmitToInitial();
  openPopup(popupPlace);
  popupPlaceForm.reset();
}

// Отправка формы добавления фото
function submitFormPlace(evt) {
  evt.preventDefault();
  const newCreateCard = createCard()
  closePopup(popupPlace);
  elementsContainer.prepend(newCreateCard.generateCard())
}



profileEditBtn.addEventListener('click', openEditProfilePopup)
imageAddBtn.addEventListener('click', openAddCardPopup);

popupCloseBtn.addEventListener('click', closePopupUser)
popupCloseBtnPlace.addEventListener('click', closePopupPlace)
popupCloseBtnImage.addEventListener('click', closePopupImage)

formSubmit.addEventListener('submit', submitFormUser)
popupPlace.addEventListener('submit', submitFormPlace)