export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopup = {
      escape: this._closePopupEscape.bind(this),
      click: this._closePopupClick.bind(this)
    }
  }

  openPopup() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup',  this._closePopup.escape);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._closePopup.escape);
  }

  _closePopupClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close-image')) {
      this.closePopup();
    }
  }
  _closePopupEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._closePopup.click);
  }

}
