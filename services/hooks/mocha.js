const addContext = require('mochawesome/addContext');

// This starts a playwright browser and page as part of the mocha lifecycle hooks.
// So that we do not need to initialize a browser, context and page on every test.
//
// And close the browsers when the test finishes or takes a screenshot and append
// to test report on test failure.
exports.mochaHooks = {
  async beforeAll() {
    const config = require('../../config/config').Config;
    this.browser = await require('playwright').chromium.launch({
      slowMo: config.slowMo,
      headless: config.headless,
      chromiumSandbox: false,
      args: ['--disable-dev-shm-usage', '--disable-gpu', '--disable-logging', '--no-sandbox'],
    });
    this.context = await this.browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: config.viewport,
      videosPath: config.videoPath,
      userAgent: config.userAgent,
    });
    this.page = await this.context.newPage();
  },
  async afterAll() {
    await this.browser.close();
  },
  async afterEach() {
    if (this.currentTest.state === 'failed') {
      const title = this.currentTest.title.replace(/\s/g, '-');
      const screenshotFileName = `${title}_failed.png`;
      await this.page.screenshot({
        path: `artifacts/report/assets/${screenshotFileName}`,
        fullPage: true,
      });
      addContext(this, `assets/${screenshotFileName}`);
    }
  },
};
