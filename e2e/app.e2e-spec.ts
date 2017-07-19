import { CidemoAppPage } from './app.po';

describe('cidemo-app App', () => {
  let page: CidemoAppPage;

  beforeEach(() => {
    page = new CidemoAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
