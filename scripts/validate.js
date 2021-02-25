/* Показать ошибку */
const showInputError = function(settingValid, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`${settingValid.inputErrorClass }_type_${inputElement.name}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingValid.activeInputErrorClass);
};   
                                                                                       
/* Скрыть ошибку */
const hideInputError = function(settingValid, formElement) {
  const errorElement = formElement.querySelector(settingValid.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settingValid.activeInputErrorClass);
};                                                                              

/* Проверить валидность поля. Показать/скрыть ошибку */
const checkInputValidity = function(settingValid, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(settingValid, formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(settingValid, formElement, inputElement)
  }
};                                                                                    

/* Включить/выключить кнопку отправки формы */
const toggleButtonState = (inputList, buttonElement) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
};                                                                                          

const setEventListeners = function(settingValid, formElement) {

  const inputList = Array.from(formElement.querySelectorAll(settingValid.inputSelector));
  const buttonElement = formElement.querySelector(settingValid.submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(settingValid, formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    };
    inputElement.addEventListener("input", handleInput);
  };
  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement);
};

/* Находим формы. Устанивливаем обработчики */
function enableValidation(settingValid) {
  const formElements = document.querySelectorAll(settingValid.formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(settingValid, formElement);
  });
};                                                                                          

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: '.popup__form-input-error',
  activeInputErrorClass: '.popup__form-input-error_active',
});