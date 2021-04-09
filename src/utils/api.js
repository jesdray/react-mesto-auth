class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editDataUser(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatarUser(url) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  changeLike(cardId, isLike) {
    if (isLike) {
      return this.removeLike(cardId);
    } else {
      return this.setLike(cardId);
    }
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  signUp(password, email) {
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse);
  }

  signIn(password, email) {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse);
  }

  usersMe(JWT) {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
    }).then(this._checkResponse);
  }
}

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: "18b437da-7ae0-4b48-b130-575ed283765a",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export { api, Api };
