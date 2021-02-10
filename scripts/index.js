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
      link: 'https://images.unsplash.com/photo-1590932074845-302cf56323a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1271&q=80'
    }
  ];

const elementsContainer = document.querySelector('.elements');
const templateEl = document.querySelector('.template');

/*const popup = document.querySelector('.popup');*/
const popupUser = document.querySelector('.popup__user');               /* Окно редактирования пользователя */
const popupPlace = document.querySelector('.popup__place');             /* Окно добавления фото */
const popupImage = document.querySelector('.popup__image');             /* Окно просмотра фото */

/*Удалить let elements__image = document.querySelector('.elements__image')*/


/* Кнопки */

/*Удалить   let popupOpenButton = document.querySelector('.profile__button-edit');
            const popupImageOpenButton = document.querySelector('.profile__button-add-image');
            let popupCloseButton = document.querySelector('.popup__button-close');*/

const profileEditBtn = document.querySelector('.profile__button-edit');                 /* Кнопка редактирования пользователя */
const imageAddBtn = document.querySelector('.profile__button-add-image');               /* Кнопка добавления фото */
const popupCloseBtn = document.querySelector('.popup__button-close');                   /* Кнопка закрытия окна редактирования пользователя*/
const popupCloseBtnPlace = document.querySelector('.popup__button-close_place');        /* Кнопка закрытия окна для добавления фото */
const popupCloseBtnImage = document.querySelector('.popup__button-close_image');        /* Кнопка закрытия окна для просмотра фото */
/* Удалить const popupSave = document.querySelector('.popup__button-save'); */

const profileName = document.querySelector('.profile__name');                             /* Имя пользователя на сайте */
const profileJob = document.querySelector('.profile__job');                               /* Профессия пользователя на сайте */
const inputName = document.querySelector('.popup__field_type_name');                      /* Имя пользователя (input) */
const inputJob = document.querySelector('.popup__field_type_job');                        /* Профессия пользователя (input) */
const inputPlaceEl = document.querySelector('.popup__field_type_place');
const inputImageEl = document.querySelector('.popup__field_type_image');

const formSubmit = document.querySelector('.popup__form');                                /* Отправка формы */

const togglePopup = function() {popupUser.classList.toggle('popup_opened');}
const togglePopupPlace = function() {popupPlace.classList.toggle('popup_opened');}
const togglePopupImage = function() {popupImage.classList.toggle('popup_opened');}


/* Удалить let formInputImage = document.querySelector('.popup__place');*/
/* Удалить let popupSaveImage = document.querySelector('.popup__button-save-place');*/


/* Удалить const inputPlaceEl= document.querySelector('.popup__field_type_place'); */
/* Удалить const inputImageEl = document.querySelector('.popup__field_type_image'); */


/* Удалить let togglePopupImage = function() {popupPlace.classList.toggle('popup_opened');}*/
/* Удалить let togglePopupImageSee = function() {popupImage.classList.toggle('popup_opened');}*/

/* Удалить let openPopupImage = function () {
    togglePopupPlace()
}*/

/* Удалить let openPopupImageSee = function () {
    togglePopupImage()
}*/



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
    removeBtn.addEventListener('click', imageDelete);

    let img = newItem.querySelector('.elements__image')
    img.addEventListener('click', imageView);

    return newItem;
}

function render() {
    const html = initialPlaces
        .map(getPlace)

    elementsContainer.append(...html);
}                                                                   /* Функция рендера фото на странице из массива */

render();

function formSubmitUser (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    togglePopup()
}                                                                   /* Отправка формы редактирования пользователя */

function formSubmitPlace (evt) {
    evt.preventDefault();
    const inputPlace = inputPlaceEl.value;
    const inputImage = inputImageEl.value;
    const inputListItem = getPlace({name: inputPlace, link: inputImage});
    elementsContainer.prepend(inputListItem);
    inputPlaceEl.value = ''
    inputImageEl.value = ''
    togglePopupPlace()
}                                                                   /* Отправка формы добавления фото */





function imageDelete(event) {
    const targetEl = event.target;
    const targetItem = targetEl.closest('.elements__element');
    targetItem.remove();
}                                                                   /* Функция удаления фото */

function imageView(event) {
    const targetEl = event.target
    const linkimage = (targetEl.src)
    const linkiname = (targetEl.alt)
    let popupImageView = document.querySelector('.popup__img').src = linkimage;
    let popupNameView = document.querySelector('.popup__caption').textContent = linkiname;
}                                                                                                   /* Функция просмотра фото */ 




profileEditBtn.addEventListener('click', openPopupUser)
imageAddBtn.addEventListener('click', openPopupPlace)

popupCloseBtn.addEventListener('click', togglePopup)
popupCloseBtnPlace.addEventListener('click', openPopupPlace)
popupCloseBtnImage.addEventListener('click', openPopupImage)

formSubmit.addEventListener('submit', formSubmitUser)
popupPlace.addEventListener('submit', formSubmitPlace)


document.onclick = function(evt) {
     if (evt.target.className == 'elements__like'){

        evt.target.classList.add('elements__like_active');

    } else {
        evt.target.classList.remove('elements__like_active');}

    if (evt.target.className == 'elements__image'){
        openPopupImage()
    }
}

/* Удалить function getItemHTML(item) {
    return `<div class="elements__element">
                <img class="elements__image" src=${item.link} alt="Нью-Йорк">
                <div class="elements__place">
                <h2 class="elements__name">${item.name}</h2>
                <button type="button" class="elements__like"></button>
                </div>
            </div>`
}*/

/*function choice (evt) {    
    if (evt.target === ViewOpen.querySelector('.elements__image')) 
    {
    popupImageSee.classList.toggle('popup_opened')
     let a = elementImage.src;
     let b = elementImage.alt;
    viewImage.src = a;
    viewImage.alt = b;
    viewTitle.textContent = b;
    a = '';
    b = '';
  }
  }*/

    /*
	var target = event.target;
    alert(target.tagName); 
    const popupSrcImage = document.querySelector(".popup__src-image");
    popupSrcImage.setAttribute("src", link);
    //выведет 'p' - абзац
    }*/

/* Удалить function formSubmitHandlerImage (evt) {
    evt.preventDefault();
    const inputPlace = 
    togglePopup()
}*/
