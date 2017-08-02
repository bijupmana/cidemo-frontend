import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getUsernameInput() {
    return element(by.css('#username'));
  }

  getPasswordInput() {
    return element(by.css('#password'));
  }

  getButton() {
    return element(by.css('.js-btn-login'));
  }

  getForm() {
    return element(by.css('.js-login-form'));
  }

  loginAs(username: string, password: string) {
    this.getUsernameInput().sendKeys(username);
    this.getPasswordInput().sendKeys(password);
    return this.getButton().click();
  }

  waitUntilPresent() {
    return browser.wait(() => {
      return this.getForm().isPresent();
    });
  }
}
