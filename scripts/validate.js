const showInputError = (inputElement, errorMessage,) => {
    const formSectionElement = inputElement.closest(".popup__form-section");
    const errorElement = formSectionElement.querySelector(".popup__form-input-error");
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__form-input-error_active");
  };                                                                                          /* Показать ошибку */
  
const hideInputError = (inputElement) => {
    const formSectionElement = inputElement.closest(".popup__form-section");
    const errorElement = formSectionElement.querySelector(".popup__form-input-error");
  
    errorElement.textContent = "";
    errorElement.classList.remove("popup__form-input-error_active");
};                                                                                            /* Скрыть ошибку */


const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
  
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
  
      showInputError(inputElement, errorMessage);
    } else {
      hideInputError(inputElement);
    }
  }                                                                                           /* Проверить вадность поля. Показать/скрыть ошибку */


const toggleButtonState = (inputList, buttonElement) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
  
    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);

    } else {
      buttonElement.removeAttribute("disabled");
    }
  };                                                                                          /* Включить/выключить кнопку отправки формы */


  const handleFormSubmit = (event) => {
    event.preventDefault();
  };                                                                                          /* Отмена отправки формы */

const setEventListeners = (formElement, inputSelector,) => {
    formElement.addEventListener("submit", handleFormSubmit);
  
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(".popup__button-save");
  
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      };
  
      inputElement.addEventListener("input", handleInput);
    };
  
    inputList.forEach(inputListIterator);
  
    toggleButtonState(inputList, buttonElement);
  };

const enableValidation = ({formSelector, inputSelector}) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      setEventListeners(formElement, inputSelector);
    });
  };                                                                                          /* Находим формы. Устанивливаем обработчики */

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
  });