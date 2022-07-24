/* eslint-disable no-unused-vars */
import { Page } from 'playwright';
/* eslint-enable no-unused-vars */

export class BasePage {
  /**
   * @constructor
   *
   * @param {Page} page - Playwright browser - context - page instance
   */
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    return await this.page.goto(url);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  getPageUrl() {
    return this.page.url();
  }
}
