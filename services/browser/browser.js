/* eslint-disable no-unused-vars */
import { Browser, Page } from 'playwright';
/* eslint-enable no-unused-vars */
import { Config } from '@config/config';

export class BrowserPage {
  /**
   * Create a new browser page on a different context.
   * A browser context and page gets created by default on start of a test.
   * Use this if you need to, for example, have two users
   * signed in on the same app.
   *
   * @param {Browser} browser
   *
   * @returns {Promise<Page>} A browser page on a different context to default.
   */
  static async createNewBrowserContextPage(browser) {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: Config.viewport,
      videosPath: Config.videoPath,
      userAgent: Config.userAgent,
    });
    return await context.newPage();
  }
}
