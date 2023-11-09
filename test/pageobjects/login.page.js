/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
  /**
   * define selectors using getter methods
   */
  get usernameInput() {
    return $("#txt-username");
  }

  get passwordInput() {
    return $("#txt-password");
  }

  get submitBtn() {
    return $("#btn-login");
  }

  get menuBtn() {
    return $("#menu-toggle");
  }

  get loginBtn() {
    return $("//a[contains(text(),'Login')]");
  }

  get logoutBtn() {
    return $("//a[contains(text(),'Logout')]");
  }

  get loginErrorMsgText() {
    return $(
      "//p[contains(text(),'Login failed! Please ensure the username and password are valid.')]"
    );
  }

  /**
   * methods to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async open() {
    return browser.url("https://katalon-demo-cura.herokuapp.com/");
  }

  async getCurrentUrl() {
    return browser.getUrl();
  }

  async assertLoginError(errorMsgText) {
    const errorMsg = await this.loginErrorMsgText.getText();
    console.log(errorMsg);
    await expect(errorMsg).toContain(errorMsgText);
  }
  async login(username, password) {
    await this.menuBtn.click();
    await this.loginBtn.click();
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitBtn.click();
  }

  async logout() {
    await this.menuBtn.click();
    await this.logoutBtn.click();
  }
}

module.exports = new LoginPage();