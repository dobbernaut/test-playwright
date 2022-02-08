import { BasePage } from '@pages/base.page';
import { StoreAllItemsPage } from './all-items.page';
import { StoreCatalogSearchPage } from './catalog-search.page';
import { StoreDealsPage } from './store-deals.page';
import { StoreTravelBookingsPage } from './travel-bookings.page';

export class StorePage extends BasePage {
  /** @type StoreAllItemsPage */
  #allItems;
  /** @type StoreDealsPage */
  #storeDeals;
  /** @type StoreTravelBookingsPage */
  #travelBookings;
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
    this.#allItems = new StoreAllItemsPage(this.page);
    this.#storeDeals = new StoreDealsPage(this.page);
    this.#travelBookings = new StoreTravelBookingsPage(this.page);
    this.#catalogSearch = new StoreCatalogSearchPage(this.page);
  }

  get allItems() {
    return this.#allItems;
  }
  get storeDeals() {
    return this.#storeDeals;
  }
  get travelBookings() {
    return this.#travelBookings;
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
