import { StatusCode } from '@constant/http-response-codes';
import { HomePage } from '@page/home.page';
import { StorePage } from '@page/store/store.page';
import { BrowserPage } from '@service/browser';
import { BlogPosts } from '@service/sample-api';
import { expect } from 'chai';

describe('Flybuys store search', function () {
  /** @type HomePage */
  let home;
  /** @type StorePage */
  let store;

  const searchItem = 'headphones';

  before(function () {
    home = new HomePage(this.page);
    store = new StorePage(this.page);
  });

  describe('From the footer search box', function () {
    it('should return search item results', async function () {
      await home.open();
      await home.footer.searchTheFlybuysStore(searchItem);

      const numberOfItems = await store.catalogSearch.getNumberOfSearchItems();
      expect(numberOfItems).to.be.greaterThan(0);

      const items = await store.catalogSearch.getSearchItems();
      items.forEach((item) => {
        expect(item.name).to.include(searchItem);
      });
    });
  });

  describe('From the Flybuys store search box', function () {
    // We will import here a service for an api as an example
    // to see how we can use services and clients.
    // This is not limited to http services, we can import client libraries
    // to access aws services, or kafka as an example.
    const blogPost = new BlogPosts();

    before(async function () {
      // This is how you can create a new browser context for
      // signing in as another user or admin to the same app.
      // You will see a second browser open when it gets to this test.
      const newPage = await BrowserPage.createNewBrowserContextPage(this.browser);
      home = new HomePage(newPage);
      store = new StorePage(newPage);
    });

    it('should return search item results', async function () {
      await home.open();
      await home.header.openFlybuysStore();
      await store.searchTheFlybuysStore(searchItem);

      const numberOfItems = await store.catalogSearch.getNumberOfSearchItems();
      expect(numberOfItems).to.be.greaterThan(0);

      const items = await store.catalogSearch.getSearchItems();
      items.forEach((item) => {
        expect(item.name).to.include(searchItem);
      });

      // We are calling a service here. And then console logging the results
      await blogPost.getAllPosts().then((response) => {
        expect(response.status).to.equal(StatusCode.Ok);
        const blogPosts = response.data;
        // Yes! we can use console.log :)
        console.log(blogPosts[0]);
        blogPosts.forEach((post) => {
          expect(post).to.have.property('id');
        });
      });
    });
  });
});
