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
    try {
      const response = await fetch(`${this._baseUrl}${url}`, requestParams);
      if (response.ok) {
        return response.json();
      }
      return await Promise.reject(`Ошибка: ${response.status}`);
    } catch (err) {
      return console.log(err);
    }
  }

  async getUserInfo() {
    const userInfo = await this.request("/users/me", "GET");
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

  async deleteCard(cardId) {
    return await this.request(`/cards/${cardId}`, "DELETE");
  }

  async likeCard(cardId, isLiked) {
    if (!isLiked) return await this.request(`/cards/like/${cardId}`, "PUT");
    return await this.request(`/cards/like/${cardId}`, "DELETE");
  }

  updateUserAvatar(avatar) {
    return this.request("/users/me/avatar", "PATCH", avatar );
  }
}
