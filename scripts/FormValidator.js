export default class FormValidator {

    constructor(settingValid, formElement) {
        this._settingValid = settingValid;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._settingValid.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settingValid.inputSelector));
         
    }
  
    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`${this._settingValid.errorSelector}_type_${inputElement.name}`);
        inputElement.classList.add(this._settingValid.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settingValid.activeErrorClass);
      }; 
  
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`${this._settingValid.errorSelector}_type_${inputElement.name}`);
        inputElement.classList.remove(this._settingValid.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._settingValid.activeErrorClass);
      };

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
      };

    _hasNotValidInput () {
        return this._inputList.some((inputElement) => {
          return !(inputElement.validity.valid && inputElement.value.trim());
        });
    }
  
    _toggleButtonState () {
        if (this._hasNotValidInput(this._inputList)) {
            this._buttonElement.classList.add(this._settingValid.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._settingValid.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled',true);
        }
      };  

    _setEventListeners () {
        this._toggleButtonState()

        this._inputList.forEach((inputElement) => {
            inputElement.classList.remove(this._settingValid.inputErrorClass)
            inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement)
              this._toggleButtonState()
            });
          });
      };



    setPopupCardSubmitToInitial() {
        this._formElement.querySelector(this._settingValid.submitButtonSelector).setAttribute('disabled',true);
        this._formElement.querySelector(this._settingValid.submitButtonSelector).classList.add(this._settingValid.inactiveButtonClass);
    }



    clearPopup() {
        const errorList = Array.from(this._formElement.querySelectorAll(`.${this._settingValid.activeErrorClass}`));
        const inputErrorList = Array.from(this._formElement.querySelectorAll(`.${this._settingValid.inputErrorClass}`));
    
        if (errorList !== []) {
          errorList.forEach((errorElement) => {
          errorElement.textContent='';
          errorElement.classList.remove(this._settingValid.activeErrorClass);
          })
        }
    
        if (inputErrorList !== []) {
          inputErrorList.forEach((inputErrorElement) => {
            inputErrorElement.classList.remove(this._settingValid.inputErrorClass);
          })
        }
      }

    enableValidation() {
        const formList = Array.from(this._formElement.querySelectorAll(this._settingValid.formSelector));
        formList.forEach(() => this._setEventListeners());
      };
  }