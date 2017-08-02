import { browser, element, by } from 'protractor';
import { LoginPage } from './page-objects/login.po';

describe('LoginPage', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  // TODO: use to validate headless chrome for now
  describe('Submit Button:', () => {
    describe('When - required fields not filled', () => {
      it('is disabled', () => {
        expect(page.getButton().isEnabled()).toBe(false);
      });
    });

    describe('When - required fields not filled', () => {
      it('is enabled', () => {
        page.getUsernameInput().sendKeys('demo');
        page.getPasswordInput().sendKeys('password');
        expect(page.getButton().isEnabled()).toBe(true);
      });
    });
  });
});