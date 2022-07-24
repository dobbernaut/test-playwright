import { BasePage } from '@page/flybuys/base.page';
import { StoreCatalogSearchPage } from './catalog-search.page';

export class StorePage extends BasePage {
  /** @type StoreCatalogSearchPage */
  #catalogSearch;

  // selectors
  #allItemsTab = 'a[title="All items"]';
  #storeDealsTab = 'a[title="Store deals"]';
  #travelBookingsTab = 'a[title="Travel bookings"]';
  #searchBox = 'input[id="search"]';
  #searchButton = 'button[title="Search"]';

  /**
   * @constructor
   *
   * @param {Page} page - Playwright browser - context - page instance
   */
  constructor(page) {
    super(page);
    this.#catalogSearch = new StoreCatalogSearchPage(this.page);
  }

  get catalogSearch() {
    return this.#catalogSearch;
  }

  async openAllItems() {
    await this.page.click(this.#allItemsTab);
  }

  async openStoreDeals() {
    await this.page.click(this.#storeDealsTab);
  }

  async openTravelBookings() {
    await this.page.click(this.#travelBookingsTab);
  }

  async searchTheFlybuysStore(search) {
    await this.page.fill(this.#searchBox, search);
    await this.page.click(this.#searchButton);
  }
}
