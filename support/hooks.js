const {
  BeforeAll,
  AfterAll,
  Before,
  After,
  BeforeStep,
  AfterStep,
} = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const { helper } = require("./helper");
let testdata = new helper();
Before({ timeout: 30000 }, async function (scenario) {
  this.featurename = scenario.gherkinDocument.feature.name;
  this.tc_id = scenario.pickle.name;
  this.browser = await chromium.launch({
    headless: false,
    channel: "chrome",
    args: ["--start-maximized"],
  });
  this.context = await this.browser.newContext({
    viewport: null,
  });
  this.page = await this.context.newPage();
  this.testcasename = this.tc_id.replaceAll(" ", "_");
  console.log(
    `Testcase ${this.tc_id} is running from ${this.featurename} featurefile`
  );
});

After({ timeout: 30000 }, async function (scenario) {
  this.testresult = scenario.result.status;
  console.log(`Testcase is ${this.testresult}`);
  await testdata.writeTestResultsinRunManager(this.tc_id, this.featurename, this.testresult);
  await this.page.close();
  await this.context.close();
});
