class reusablePage {
  constructor(page, context, tc_id, attach) {
    this.page = page;
    this.context = context;
    this.tc_id = tc_id;
    this.attach = attach;
  }
  async launchWebsite(websiteurl) {
    await this.page.goto(websiteurl, { timeout: 60000 });
  }
  async takePageScreenShot(screenshotname) {
    await this.page.waitForTimeout(1000);
    let screenshot = await this.page.screenshot({
      path: `./test-results/${process.env.current_date_time}/screenshots/${this.tc_id}/${screenshotname}.png`,
    });
    this.attach(screenshot, "image/png");
  }
  async takeLocatorScreenShot(locator, screenshotname) {
    await this.page.waitForTimeout(1000);
    let screenshot = await locator.screenshot({
      path: `./test-results/${process.env.current_date_time}/screenshots/${this.tc_id}/${screenshotname}.png`,
    });
    this.attach(screenshot, "image/png");
  }
}

module.exports = { reusablePage };
