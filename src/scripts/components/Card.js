export default class Card {

  constructor({name, link, likes, owner, _id},
    templateSelector, handleCardClick, {handleRemoveClick, handleCardLike, handleCardDislike}, {id}) {
      this._name = name;
      this._link = link;
      this._arrLikesCard = likes;
      this._owner = owner;
      this._id = _id;
      this._selector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleRemoveClick = handleRemoveClick;
      this._mineId = id;
      this._handleCardLike = handleCardLike;
      this._handleCardDislike = handleCardDislike;
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
        likesCounter: this._element.querySelector('.elements__like-counter'),
      }
      return elementsOfCard;
    }
  
    _setEventListeners() {
      this._elementsOfCard.buttonLike.addEventListener('click', () => this._handlelike());
      this._elementsOfCard.buttonRemove.addEventListener('click', () => this._handleRemoveClick());
      this._elementsOfCard.cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link))
    }

    _handlelike() {
      if (!this._elementsOfCard.buttonLike.classList.contains('elements__like_active')) {
        this._elementsOfCard.buttonLike.classList.add('elements__like_active')
        this._handleCardLike();
      } else {
        this._elementsOfCard.buttonLike.classList.remove('elements__like_active')
        this._handleCardDislike();
      }
    }
  
    setCounterOfLikes(num){
      this._elementsOfCard.likesCounter.textContent = num;
    }

    _cardHasLike() {
      if (this._arrLikesCard.some(user => user._id === this._mineId)) {
        this._elementsOfCard.buttonLike.classList.add('elements__like_active');
      }
    }
  
    _setVisibleButtonRemove() {
      if (this._owner._id === this._mineId) {
        this._elementsOfCard.buttonRemove.classList.add('elements__btn-remove_active');
      }
    }
  
    removeCard() {
      this._element.remove();
      this._element = null;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._elementsOfCard = this._getElementsOfCard();
      this._elementsOfCard.cardImage.src = this._link;
      this._elementsOfCard.cardImage.alt = this._name;
      this._elementsOfCard.cardName.textContent = this._name;
      this._elementsOfCard.likesCounter.textContent = this._arrLikesCard.length;
      this._setEventListeners();
      this._cardHasLike();
      this._setVisibleButtonRemove();
      return this._element;
    }
  }