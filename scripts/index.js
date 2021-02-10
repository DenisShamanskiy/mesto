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

const popupUser = document.querySelector('.popup__user');               /* Окно редактирования пользователя */
const popupPlace = document.querySelector('.popup__place');             /* Окно добавления фото */
const popupImage = document.querySelector('.popup__image');             /* Окно просмотра фото */

const profileEditBtn = document.querySelector('.profile__button-edit');                 /* Кнопка редактирования пользователя */
const imageAddBtn = document.querySelector('.profile__button-add-image');               /* Кнопка добавления фото */
const popupCloseBtn = document.querySelector('.popup__button-close');                   /* Кнопка закрытия окна редактирования пользователя*/
const popupCloseBtnPlace = document.querySelector('.popup__button-close_place');        /* Кнопка закрытия окна для добавления фото */
const popupCloseBtnImage = document.querySelector('.popup__button-close_image');        /* Кнопка закрытия окна для просмотра фото */

let profileName = document.querySelector('.profile__name');                             /* Имя пользователя на сайте */
let profileJob = document.querySelector('.profile__job');                               /* Профессия пользователя на сайте */
let inputName = document.querySelector('.popup__field_type_name');                      /* Имя пользователя (input) */
let inputJob = document.querySelector('.popup__field_type_job');                        /* Профессия пользователя (input) */
let inputPlaceEl = document.querySelector('.popup__field_type_place');
let inputImageEl = document.querySelector('.popup__field_type_image');

const formSubmit = document.querySelector('.popup__form');                                /* Отправка формы */

const togglePopup = function() {popupUser.classList.toggle('popup_opened');}
const togglePopupPlace = function() {popupPlace.classList.toggle('popup_opened');}
const togglePopupImage = function() {popupImage.classList.toggle('popup_opened');}



const openPopupUser = function () {
    togglePopup()
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
}                                                                   /* Открыть окно редактирования пользователя */

const openPopupPlace = function () {togglePopupPlace()}             /* Открыть окно добавления фото */
const openPopupImage = function () {togglePopupImage()}             /* Открыть окно просмотра фото */

function getPlace(item) {
    const newItem = templateEl.content.cloneNode(true);
    const elementImage = newItem.querySelector('.elements__image').src = item.link;
    const elementAlt = newItem.querySelector('.elements__image').alt = item.name;
    const elementName = newItem.querySelector('.elements__name').textContent = item.name;

    const removeBtn = newItem.querySelector('.elements__btn-remove');
    removeBtn.addEventListener('click', deleteImage);

    let img = newItem.querySelector('.elements__image')
    img.addEventListener('click', viewImage);

    return newItem;
}

function render() {
    const html = initialPlaces
        .map(getPlace)

    elementsContainer.append(...html);
}                                                                   /* Функция рендера фото на странице из массива */

render();

function submitFormUser (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    togglePopup()
}                                                                   /* Отправка формы редактирования пользователя */

function submitFormPlace (evt) {
    evt.preventDefault();
    const inputPlace = inputPlaceEl.value;
    const inputImage = inputImageEl.value;
    const inputListItem = getPlace({name: inputPlace, link: inputImage});
    elementsContainer.prepend(inputListItem);
    inputPlaceEl.value = ''
    inputImageEl.value = ''
    togglePopupPlace()
}                                                                   /* Отправка формы добавления фото */

function deleteImage(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.elements__element');
    targetItem.remove();
}                                                                   /* Функция удаления фото */

function viewImage(event) {
    const targetEl = event.target
    const linkimage = (targetEl.src)
    const linkiname = (targetEl.alt)
    let popupImageView = document.querySelector('.popup__photo').src = linkimage;
    let popupNameView = document.querySelector('.popup__caption').textContent = linkiname;
}                                                                                                   /* Функция просмотра фото */ 



profileEditBtn.addEventListener('click', openPopupUser)
imageAddBtn.addEventListener('click', openPopupPlace)

popupCloseBtn.addEventListener('click', togglePopup)
popupCloseBtnPlace.addEventListener('click', openPopupPlace)
popupCloseBtnImage.addEventListener('click', openPopupImage)

formSubmit.addEventListener('submit', submitFormUser)
popupPlace.addEventListener('submit', submitFormPlace)


document.onclick = function(evt) {
     if (evt.target.className == 'elements__like'){

        evt.target.classList.add('elements__like_active');

    } else {
        evt.target.classList.remove('elements__like_active');}

    if (evt.target.className == 'elements__image'){
        openPopupImage()
    }
}
