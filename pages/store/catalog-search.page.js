import { BasePage } from '@page/base.page';

export class StoreCatalogSearchPage extends BasePage {
  // selectors
  #numberOfSearchItems = '[itemprop="numberOfItems"]';
  #itemsList = '.ais-Hits-list';
  #items = '.ais-Hits-item';
  #product = '[itemprop="itemListElement"]';
  #productUrl = '[itemprop="url"]';
  #productName = '[itemprop="name"]';
  #productPrice = '[itemprop="lowPrice"]';

  /**
   * Return the number of search item results.
   *
   * @returns {Promise<number>}
   */
  async getNumberOfSearchItems() {
    await this.page.waitForSelector(this.#numberOfSearchItems);
    return parseInt(await (await this.page.$(this.#numberOfSearchItems)).innerText(), 10);
  }

  /**
   * Return a detailed list of search item results.
   * Each item on the list includes the product id, name, url and required points
   *
   * @return {Promise<[{ productId, name, url, points }>]
   */
  async getSearchItems() {
    await this.page.waitForSelector(this.#itemsList);

    const searchItems = [];
    for (const item of await this.page.$$(this.#items)) {
      searchItems.push({
        productId: parseInt(await (await item.$(this.#product)).getAttribute('data-product-id'), 10),
        name: (await (await item.$(this.#productName)).innerText()).toLowerCase(),
        url: await (await item.$(this.#productUrl)).getAttribute('href'),
        points: parseInt((await (await item.$(this.#productPrice)).innerText()).replace(/,/g, ''), 10),
      });
    }
    return searchItems;
  }
}
