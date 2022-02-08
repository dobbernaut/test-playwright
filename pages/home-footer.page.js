import { BasePage } from './base.page';

export class HomePageFooter extends BasePage {
  // selectors
  #searchBox = 'footer form[class*="search"] input';
  #searchButton = 'footer button[type="submit"]';

  /**
   * @constructor
   *
   * @param {Page} page - Playwright browser - context - page instance
   */
  constructor(page) {
    super(page);
  }

  async searchTheFlybuysStore(search) {
    await this.page.fill(this.#searchBox, search);
    await this.page.click(this.#searchButton);
  }
}
