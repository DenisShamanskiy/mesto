export default class Card {

  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

    _getTemplate() {
      const cardElement = document.querySelector(this._selector).content.querySelector('.elements__element').cloneNode(true);
  
      return cardElement;
    }
  
    _getElementsOfCard() {
      const elementsOfCard = {
        cardImage: this._element.querySelector('.elements__image'),
        cardName: this._element.querySelector('.elements__name'),
        buttonLike: this._element.querySelector('.elements__like'),
        buttonRemove: this._element.querySelector('.elements__btn-remove'),
      }
  
      return elementsOfCard;
    }
  
    _setEventListeners() {
      this._elementsOfCard.buttonLike.addEventListener('click', () => this._likeCard());
      this._elementsOfCard.buttonRemove.addEventListener('click', () => this._deleteCard());
      this._elementsOfCard.cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link))
    }
  
    _likeCard() {
      this._elementsOfCard.buttonLike.classList.toggle('elements__like_active');
    }
  
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._elementsOfCard = this._getElementsOfCard();
  
      this._elementsOfCard.cardImage.src = this._link;
      this._elementsOfCard.cardImage.alt = this._name;
      this._elementsOfCard.cardName.textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
  }