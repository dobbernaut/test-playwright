import { BasePage } from './base.page';

export class HomePageHeader extends BasePage {
  // selectors
  #flybuysStore = '[data-testid="primary-nav-store"]';

  /**
   * @constructor
   *
   * @param {Page} page - Playwright browser - context - page instance
   */
  constructor(page) {
    super(page);
  }

  async openFlybuysStore() {
    await this.page.click(this.#flybuysStore);
  }
}
