class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  async request(url, method, params = "") {
    const headers = {
      authorization: this._token,
    };
    const body = JSON.stringify(params);
    const requestParams = { headers, method };
    if (params) {
      requestParams.body = body;
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${this._baseUrl}${url}`, requestParams);
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getUserInfo() {
    const userInfo = this.request("/users/me", "GET");
    return userInfo;
  }

  getCards() {
    const cardList = this.request("/cards", "GET");
    return cardList;
  }

  updateUserInfo(userInfo) {
    return this.request("/users/me", "PATCH", userInfo);
  }

  createCard(card) {
    return this.request("/cards", "POST", card);
  }

  deleteCard(cardId) {
    return this.request(`/cards/${cardId}`, "DELETE");
  }

  likeCard(cardId, isLiked) {
    if (!isLiked) return this.request(`/cards/like/${cardId}`, "PUT");
    return this.request(`/cards/like/${cardId}`, "DELETE");
  }

  updateUserAvatar(avatar) {
    return this.request("/users/me/avatar", "PATCH", avatar);
  }
}
