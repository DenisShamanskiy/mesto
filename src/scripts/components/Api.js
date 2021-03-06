export default class Api {
    constructor ({idCohort, token, urlServer}) {
      this._idCohort = idCohort;
      this._token = token;
      this._urlServer = urlServer;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    }
  
    getUser() {
      return fetch(`${this._urlServer}/${this._idCohort}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkResponse)
    }
  
    getCards() {
      return fetch(`${this._urlServer}/${this._idCohort}/cards`, {
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkResponse);
    }
  
    patchUserInfo(user) {
      return fetch(`${this._urlServer}/${this._idCohort}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          about: user.about
        })
      })
        .then(this._checkResponse);
    }
  
    postCard(card) {
      return fetch(`${this._urlServer}/${this._idCohort}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      })
        .then(this._checkResponse)
    }

    likeCard(card) {
      return fetch(`${this._urlServer}/${this._idCohort}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
        }
      })
        .then(this._checkResponse)
    }

    dislikeCard(card) {
      return fetch(`${this._urlServer}/${this._idCohort}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
        .then(this._checkResponse)
    }
    
    getCountsOfLikes(card) {
      return fetch(`${this._urlServer}/${this._idCohort}/cards/likes/${card._id}`, {
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkResponse)
    }

    deleteCard(card) {
      return fetch(`${this._urlServer}/${this._idCohort}/cards/${card._id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
        .then(this._checkResponse)
    }
  
    changeAvatar(link) {
      return fetch(`${this._urlServer}/${this._idCohort}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
          })
        })
        .then(this._checkResponse)
    }
  }