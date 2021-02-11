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
const templateEl = document.querySelector('.template');

const popupUser = document.querySelector('.popup_type_user');                           /* Окно редактирования пользователя */
const popupPlace = document.querySelector('.popup_type_place');                         /* Окно добавления фото */
const popupImage = document.querySelector('.popup_type_image');                         /* Окно просмотра фото */

const profileEditBtn = document.querySelector('.profile__button-edit');                 /* Кнопка редактирования пользователя */
const imageAddBtn = document.querySelector('.profile__button-add-image');               /* Кнопка добавления фото */
const popupCloseBtn = document.querySelector('.popup__button-close');                   /* Кнопка закрытия окна редактирования пользователя*/
const popupCloseBtnPlace = document.querySelector('.popup__button-close_place');        /* Кнопка закрытия окна для добавления фото */
const popupCloseBtnImage = document.querySelector('.popup__button-close_image');        /* Кнопка закрытия окна для просмотра фото */

const profileName = document.querySelector('.profile__name');                            /* Имя пользователя на сайте */
const profileJob = document.querySelector('.profile__job');                              /* Профессия пользователя на сайте */
const inputName = document.querySelector('.popup__field_type_name');                     /* Имя пользователя (input) */
const inputJob = document.querySelector('.popup__field_type_job');                       /* Профессия пользователя (input) */
const inputPlaceEl = document.querySelector('.popup__field_type_place');
const inputImageEl = document.querySelector('.popup__field_type_image');

const formSubmit = document.querySelector('.popup__form');                                /* Отправка формы */

const openPopupUser =  () => {
  openPopup(popupUser)
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
}                                                                                         /* Открыть окно редактирования пользователя */
const openPopupPlace = () => {openPopup(popupPlace)}                                      /* Открыть окно добавления фото */
const openPopupImage = () => {openPopup(popupImage)}                                      /* Открыть окно просмотра фото */

const closePopupUser = () => {closePopup(popupUser)}                                      /* Закрыть окно редактирования пользователя */
const closePopupPlace = () => {closePopup(popupPlace)}                                    /* Закрыть окно добавления фото */
const closePopupImage = () => {closePopup(popupImage)}                                    /* Закрыть окно просмотра фото */

const popupImageView = document.querySelector('.popup__photo');
const popupNameView = document.querySelector('.popup__caption');



function openPopup(popup) {
  popup.classList.add('popup_opened');
}                                                                                         /* Открыть Popup */

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}                                                                                         /* Закрыть Popup */


                                                                               
function viewImage(link, name) {
  popupImageView.src = link;
  popupNameView.textContent = name;
  popupImageView.alt = name;
  openPopupImage();
}                                                                                         /* Увеличить фото */



function toggleLikeButton(evt) {
  evt.target.classList.toggle('elements__like_active');
}                                                                                         /* Лайк */



function getPlace(item) {
    const newItem = templateEl.content.cloneNode(true);
  
    newItem.querySelector('.elements__image').src = item.link;
    newItem.querySelector('.elements__name').textContent = item.name;
    newItem.querySelector('.elements__image').alt = item.name;
  
    const removeBtn = newItem.querySelector('.elements__btn-remove');
    removeBtn.addEventListener('click', deleteImage);

    const img = newItem.querySelector('.elements__image')

    img.addEventListener('click', () => viewImage(item.link, item.name));

    const likeButton = newItem.querySelector('.elements__like');
    likeButton.addEventListener('click', toggleLikeButton);

    return newItem;
}                                                                                         /* Создание карточки */

function render() {
    const html = initialPlaces
        .map(getPlace)

    elementsContainer.append(...html);
}                                                                                         /* Рендер фото на странице из массива */

render();

function submitFormUser (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    closePopupUser()
}                                                                                         /* Отправка формы редактирования пользователя */

function submitFormPlace (evt) {
    evt.preventDefault();
    const inputPlace = inputPlaceEl.value;
    const inputImage = inputImageEl.value;
    const inputListItem = getPlace({name: inputPlace, link: inputImage});
    elementsContainer.prepend(inputListItem);
    inputPlaceEl.value = ''
    inputImageEl.value = ''
    closePopupPlace()
}                                                                                          /* Отправка формы добавления фото */

function deleteImage(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.elements__element');
    targetItem.remove();
}                                                                                          /* Функция удаления фото */



profileEditBtn.addEventListener('click', openPopupUser)
imageAddBtn.addEventListener('click', openPopupPlace)

popupCloseBtn.addEventListener('click', closePopupUser)
popupCloseBtnPlace.addEventListener('click', closePopupPlace)
popupCloseBtnImage.addEventListener('click', closePopupImage)

formSubmit.addEventListener('submit', submitFormUser)
popupPlace.addEventListener('submit', submitFormPlace)