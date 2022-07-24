/* eslint-disable no-unused-vars */
import { Page } from 'playwright';
/* eslint-enable no-unused-vars */
import { Config } from '@config/config';
import { BasePage } from './base.page';
import { HomePageHeader } from './home-header.page';
import { HomePageFooter } from './home-footer.page';

export class HomePage extends BasePage {
  /** @type HomePageHeader */
  #header;
  /** @type HomePageFooter */
  #footer;

  /**
   * @constructor
   *
   * @param {Page} page - Playwright browser - context - page instance
   */
  constructor(page) {
    super(page);
    this.#header = new HomePageHeader(this.page);
    this.#footer = new HomePageFooter(this.page);
  }

  get header() {
    return this.#header;
  }
  get footer() {
    return this.#footer;
  }

  async open() {
    await super.open(Config.baseURL);
  }
}
