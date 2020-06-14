class UserInfo {
  constructor(name, job, avatar,id, nameElement, jobElement, avatarElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this.avatar = avatar;
    this._avatarElement = avatarElement;
    this.name = name;
    this.job = job;
    this.id = id;
  }
  setUserInfo(name, job, id) {
    this.name = name;
    this.job = job;
    this.id = id;
    this.updateUserInfo();
  }
  setUserAvatar(avatar) {
    this.avatar = avatar;
    this.updateUserInfo();
  }
  updateUserInfo() {
    this._nameElement.textContent = this.name;
    this._jobElement.textContent = this.job;
    this._avatarElement.style.backgroundImage = `url(${this.avatar})`
  }
}
