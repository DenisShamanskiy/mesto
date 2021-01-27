let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = document.querySelector('.popup__button-close');

let togglePopup = function() {
    popup.classList.toggle('popup__opened');
}

popupOpenButton.classList.add('popup__opened');

popupOpenButton.addEventListener('click', togglePopup)
popupCloseButton.addEventListener('click', togglePopup)

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let inputName = document.querySelector('.popup__name');
let inputJob = document.querySelector('.popup__job');

let formInput = document.querySelector('.popup__form');
let popupSave = document.querySelector('.popup__button-save');
let nameInput = '';
let jobInput = '';

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput = inputName.value
    jobInput = inputJob.value
    profileName.textContent = nameInput
    profileJob.textContent = jobInput
}

formInput.addEventListener('submit', formSubmitHandler)
popupSave.addEventListener('click', togglePopup)

document.onclick = function(evt) {
    if (evt.target.className == 'elements__like'){

        evt.target.classList.add('elements__like-active');

    } else {

        evt.target.classList.remove('elements__like-active');}
}
