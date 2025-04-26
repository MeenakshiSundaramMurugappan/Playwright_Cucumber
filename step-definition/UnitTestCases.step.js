const { Given, When, Then } = require("@cucumber/cucumber");
const { POmanager } = require("../pageobjects/POmanager");
const dataset = JSON.parse(
  JSON.stringify(require("../datatables/json/constants.json"))
);
const { setDefaultTimeout } = require("@cucumber/cucumber");
const { helper } = require("../support/helper");
const testdata = new helper();
setDefaultTimeout(90 * 1000);

Given("Iam on RahulShettys Automation practise page", async function () {
  //*********  Declaring page objects **********//
  let pageobjects = new POmanager(
    this.page,
    this.context,
    this.testcasename,
    this.attach
  );
  let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
  let reusablePage = await pageobjects.getReusablePage();

  //********** Launching the Website  *********//
  console.log(`Website is ${dataset.rahulshettyATpractisepage1}`);
  await reusablePage.launchWebsite(dataset.rahulshettyATpractisepage1);
  await unitTestCasePage.waitForautosuggestivebox();
  await reusablePage.takePageScreenShot("HomePage");
});

Then(
  "Click on all the radio buttons and validate radio button labels",
  async function () {
    //*********  Declaring page objects **********//
    let pageobjects = new POmanager(
      this.page,
      this.context,
      this.testcasename,
      this.attach
    );
    let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
    let reusablePage = await pageobjects.getReusablePage();

    //********** Click on the Radio buttons and validate labels *********//
    await unitTestCasePage.clickAllRadioButtons();
    await unitTestCasePage.validateRadioButtonLabel();
    await reusablePage.takePageScreenShot("RadioButtons");
  }
);

Then(
  "Enter text in auto suggestive dropdown and select the required country",
  async function () {
    //*********  Declaring page objects **********//
    let pageobjects = new POmanager(
      this.page,
      this.context,
      this.testcasename,
      this.attach
    );
    let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
    let reusablePage = await pageobjects.getReusablePage();

    //********** Enter text in auto suggestive dropdown and select the required country *********//
    let country = await testdata.getExcelData(
      this.featurename,
      this.tc_id,
      "Country"
    );
    let countryname = country.substring(0, 3);
    await unitTestCasePage.entertextinautosuggestivebox(countryname);
    await unitTestCasePage.selectCountry(country);
    await reusablePage.takePageScreenShot("Autosuggestivebox");
  }
);

Then("Select an Option from Select Dropdown", async function () {
  //*********  Declaring page objects **********//
  let pageobjects = new POmanager(
    this.page,
    this.context,
    this.testcasename,
    this.attach
  );
  let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
  let reusablePage = await pageobjects.getReusablePage();

  //********** Select an Option from Select Dropdown *********//
  let dropdown = await unitTestCasePage.selectOptioninSelectDropdown(
    await testdata.getExcelData(this.featurename, this.tc_id, "DropDownOption")
  );
  await reusablePage.takeLocatorScreenShot(dropdown, "selectDropDown");
});

Then("Select a checkbox", async function () {
  //*********  Declaring page objects **********//
  let pageobjects = new POmanager(
    this.page,
    this.context,
    this.testcasename,
    this.attach
  );
  let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
  let reusablePage = await pageobjects.getReusablePage();

  //********** Select a checkbox *********//
  await unitTestCasePage.clickthirdCheckBox();
  await reusablePage.takePageScreenShot("checkboxvalidation");
});

Then(
  "Validate whether new window is opened on clicking open window button",
  async function () {
    //*********  Declaring page objects **********//
    let pageobjects = new POmanager(
      this.page,
      this.context,
      this.testcasename,
      this.attach
    );
    let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
    let reusablePage = await pageobjects.getReusablePage();

    //********** Handle newly opened window *********//
    let newwindow = await unitTestCasePage.clickopenWindowButton();

    pageobjects = new POmanager(
      newwindow,
      this.context,
      this.testcasename,
      this.attach
    );
    unitTestCasePage = await pageobjects.getUnitTestCasesPage();

    await unitTestCasePage.waitForBlogLink();
    let content = await unitTestCasePage.getcontentinnewWindow();
    await reusablePage.takeLocatorScreenShot(content, "contentinnewwindow");
    await newwindow.close();
  }
);

Then(
  "Validate whether new tab is opened on clicking open tab button",
  async function () {
    //*********  Declaring page objects **********//
    let pageobjects = new POmanager(
      this.page,
      this.context,
      this.testcasename,
      this.attach
    );
    let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
    let reusablePage = await pageobjects.getReusablePage();

    //********** Handle newly opened tab *********//
    let newwindow = await unitTestCasePage.clickopentab();

    pageobjects = new POmanager(
      newwindow,
      this.context,
      this.testcasename,
      this.attach
    );
    unitTestCasePage = await pageobjects.getUnitTestCasesPage();

    await unitTestCasePage.waitForBlogLink();
    let content = await unitTestCasePage.getcontentinnewWindow();
    await reusablePage.takeLocatorScreenShot(content, "contentinnewwindow");
    await newwindow.close();
  }
);

Then(
  "Validate whether Alert is handled properly with assertions",
  async function () {
    //*********  Declaring page objects **********//
    let pageobjects = new POmanager(
      this.page,
      this.context,
      this.testcasename,
      this.attach
    );
    let unitTestCasePage = await pageobjects.getUnitTestCasesPage();
    let reusablePage = await pageobjects.getReusablePage();

    //********** Handle Alert *********//
    await unitTestCasePage.enterNameinNameTextBox(
      await testdata.getExcelData(this.featurename, this.tc_id, "Name")
    );

    await unitTestCasePage.clickAlertButton(
      await testdata.getExcelData(
        this.featurename,
        this.tc_id,
        "ExpectedAlertMessage"
      ),
      await testdata.getExcelData(this.featurename, this.tc_id, "Name")
    );

    await unitTestCasePage.enterNameinNameTextBox(
        await testdata.getExcelData(this.featurename, this.tc_id, "Name")
      );
  
      await unitTestCasePage.clickConfirmButton(
        await testdata.getExcelData(
          this.featurename,
          this.tc_id,
          "ExpectedConfirmMessage"
        ),
        await testdata.getExcelData(this.featurename, this.tc_id, "Name")
      );

  }
);
