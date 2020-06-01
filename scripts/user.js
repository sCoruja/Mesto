class UserInfo {
  constructor(name, job) {
    this._nameElement = document.querySelector(".user-info__name");
    this._jobElement = document.querySelector(".user-info__job");
    this.name = name;
    this.job = job;
  }
  setUserInfo(name, job) {
    this.name = name;
    this.job = job;
    this.updateUserInfo();
  }
  updateUserInfo() {
    this._nameElement.textContent = this.name;
    this._jobElement.textContent = this.job;
  }
}
