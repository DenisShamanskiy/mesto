export default class FormValidator {
  constructor(settingsValid, formElement) {
    this._settingsValid = settingsValid;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._settingsValid.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settingsValid.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `${this._settingsValid.errorSelector}_type_${inputElement.name}`
    );
    inputElement.classList.add(this._settingsValid.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settingsValid.activeErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `${this._settingsValid.errorSelector}_type_${inputElement.name}`
    );
    inputElement.classList.remove(this._settingsValid.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settingsValid.activeErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasNotValidInput() {
    return this._inputList.some((inputElement) => {
      return !(inputElement.validity.valid && inputElement.value.trim());
    });
  }

  _toggleButtonState() {
    if (this._hasNotValidInput(this._inputList)) {
      this._buttonElement.classList.add(
        this._settingsValid.inactiveButtonClass
      );
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(
        this._settingsValid.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._settingsValid.inputErrorClass);
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  setPopupToInitialState() {
    this._inputList.forEach((inputErrorElement) =>
      this._hideInputError(inputErrorElement)
    );
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._settingsValid.inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
