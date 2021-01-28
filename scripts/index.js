let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = document.querySelector('.popup__button-close');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let inputName = document.querySelector('.popup__field_type_name');
let inputJob = document.querySelector('.popup__field_type_job');

let formInput = document.querySelector('.popup__form');
let popupSave = document.querySelector('.popup__button-save');

let togglePopup = function() {
    popup.classList.toggle('popup_opened');
}

let openPopup = function () {
    togglePopup()
    inputName.value = profileName.textContent
    inputJob.value = profileJob.textContent
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value
    profileJob.textContent = inputJob.value
    togglePopup()
}

popupOpenButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', togglePopup)
formInput.addEventListener('submit', formSubmitHandler)
