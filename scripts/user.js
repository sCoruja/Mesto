class UserInfo {
  constructor(name, job, nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
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
