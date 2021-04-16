import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super(popupSelector);
    this._photoItem = this._popupElement.querySelector('.popup__photo');
    this._photoItemCaption = this._popupElement.querySelector('.popup__caption');
  };

  openPopup(name, link) {
    super.openPopup();
    this._photoItem.src = link;
    this._photoItem.alt = name;
    this._photoItemCaption.textContent = name;
  }
}
