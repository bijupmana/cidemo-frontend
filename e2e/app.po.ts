import { browser, by, element } from 'protractor';

export class CidemoAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-header h1')).getText();
  }
}
