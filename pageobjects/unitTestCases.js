const { expect } = require("@playwright/test");

class unitTestCases {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.autosuggestivebox = this.page.locator("input[id='autocomplete']");
    this.radiobuttons = this.page.locator("input[name='radioButton']");
    this.radiobuttonswithlabel = this.page.locator("label[for*='radio']");
    this.autosuggestiveOptions = this.page.locator("li[class='ui-menu-item']");
    this.selectDropdown = this.page.locator("#dropdown-class-example");
    this.thirdCheckBox = this.page.locator("#checkBoxOption3");
    this.openWindowButton = this.page.locator("#openwindow");
    this.opentabButton = this.page.locator("#opentab");
    this.contentinnewWindow = this.page.locator(".about-cont p");
    this.BlogLink = this.page.locator("//a[text()='Blog']").first();
    this.nameTextBox = this.page.locator("#name");
    this.alertBtn = this.page.locator("#alertbtn");
    this.confirmbtn = this.page.locator("#confirmbtn");
    this.coursesTable = this.page.locator("//table[@name='courses']");
    this.mouseHoverButton = this.page.locator("#mousehover");
    this.fixedHeaderTable = this.page.locator(
      "//div[@class='tableFixHead']/table[@id='product']"
    );
    this.WebTableFixedHeader = this.page.locator("text=Web Table Fixed header");
    this.totalAmountDisplayed = this.page.locator("div[class='totalAmount']");
    this.TopHyperLink = this.page.getByRole("link", { name: "Top" });
    //this.framePresent = this.page.frame({name:"iframe-name"});
    this.framePresent = this.page.frameLocator("#courses-iframe");
    this.allLinksinFrame = this.framePresent.locator("//a");
    this.frametext = this.page.locator("text=iFrame Example");
    this.LearningpathsLink = this.framePresent.getByRole("link", {
      name: "Learning paths",
    });
    this.learningpathHeader = this.framePresent.locator(
      "h1:has-text('LEARNING PATHS')"
    );
    this.joinNowbtn = this.framePresent.locator("//a[text()='JOIN NOW']");
  }

  async moveToJoinNowbtn()
  {
    await this.joinNowbtn.scrollIntoViewIfNeeded();
  }

  async validatelearningpathHeader() {
    await (this.learningpathHeader).waitFor();
    await expect(this.learningpathHeader).toBeVisible();
  }

  async clickLearningpathsLink() {
    await this.LearningpathsLink.scrollIntoViewIfNeeded();
    await this.LearningpathsLink.click();
  }

  async movetoframe() {
    await this.frametext.scrollIntoViewIfNeeded();
  }

  async getAllLinksInFrame() {
    let links = await this.allLinksinFrame.allTextContents();
    console.log(links);
  }

  async clickTopHyperLink() {
    await this.TopHyperLink.waitFor();
    await this.TopHyperLink.click();
  }

  async HoveronMouseHoverButton() {
    await this.mouseHoverButton.hover();
  }

  async moveToWebTableHeader() {
    await this.WebTableFixedHeader.scrollIntoViewIfNeeded();
  }

  async getAmountFromTable() {
    const rows = await this.fixedHeaderTable
      .locator("xpath=.//tbody/tr")
      .count();
    let sum = 0;
    let Amount;
    for (let i = 1; i <= rows; i++) {
      Amount = await this.fixedHeaderTable
        .locator(`xpath=.//tbody/tr[${i}]/td[4]`)
        .textContent();
      Amount = Number(Amount);
      sum = sum + Amount;
    }
    console.log(`Total Amount is ${sum}`);
    let totalAmountCalulated = sum.toString();
    await expect(this.totalAmountDisplayed).toContainText(totalAmountCalulated);
    console.log(`Total Amount is displayed as expected`);
  }

  async movetoMousehoverButton() {
    await this.mouseHoverButton.scrollIntoViewIfNeeded();
  }

  async clickConfirmButton(expectedmsg, name) {
    let msg = expectedmsg;
    msg = msg.replace("xxx", name);
    this.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(msg);
      console.log(`Alert message is ${dialog.message()}`);
      expect(dialog.type()).toBe("confirm");
      await dialog.dismiss();
    });
    await this.confirmbtn.click();
  }

  async clickAlertButton(expectedmsg, name) {
    let msg = expectedmsg;
    msg = msg.replace("xxx", name);
    this.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(msg);
      console.log(`Alert message is ${dialog.message()}`);
      expect(dialog.type()).toBe("alert");
      await dialog.accept();
    });
    await this.alertBtn.click();
  }

  async enterNameinNameTextBox(Value) {
    await this.nameTextBox.fill(Value);
  }

  async clickopentab() {
    const [newpage] = await Promise.all([
      this.context.waitForEvent("page"),
      this.opentabButton.click(),
    ]);
    return newpage;
  }

  async getcontentinnewWindow() {
    await this.contentinnewWindow.scrollIntoViewIfNeeded();
    let content = await this.contentinnewWindow.textContent();
    console.log(content);
    return await this.contentinnewWindow;
  }

  async waitForBlogLink() {
    await this.BlogLink.waitFor({ state: "visible", timeout: 60000 });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickopenWindowButton() {
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      this.openWindowButton.click(),
    ]);
    return newPage;
  }

  async clickthirdCheckBox() {
    await this.thirdCheckBox.check();
  }

  async selectOptioninSelectDropdown(Value) {
    await this.selectDropdown.selectOption(Value);
    return await this.selectDropdown;
  }
  async selectCountry(Value) {
    await this.autosuggestiveOptions
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
    const options = await this.autosuggestiveOptions;
    const count = await options.count();
    console.log(`Count is ${count}`);
    for (let i = 0; i < count; i++) {
      let countryname = await options.nth(i).textContent();
      if (countryname == Value) {
        await options.nth(i).click();
        break;
      }
    }
  }
  async ValidateAutosuggestiveboxinViewport() {
    await expect(this.autosuggestivebox).toBeInViewport();
  }
  async entertextinautosuggestivebox(value) {
    await this.autosuggestivebox.pressSequentially(value);
  }
  async waitForautosuggestivebox() {
    await this.autosuggestivebox.waitFor({ state: "visible", timeout: 90000 });
  }
  async clickAllRadioButtons() {
    const radiobtns = await this.radiobuttons;
    const count = await radiobtns.count();
    console.log(`Count of the radio buttons is ${count}`);
    for (let i = 0; i < count; i++) {
      await radiobtns.nth(i).click();
    }
  }
  async validateRadioButtonLabel() {
    const radiolabels = await this.radiobuttonswithlabel;
    const count = await radiolabels.count();
    for (let i = 0; i < count; i++) {
      let radiobtnText = await radiolabels.nth(i).textContent();
      expect(radiobtnText).toContain("Radio");
    }
  }

  async getDatafromcoursesTable(value) {
    const rows = await this.coursesTable.locator("xpath=.//tbody/tr");
    const rowcount = await rows.count();
    const columns = await this.coursesTable.locator("xpath=.//tbody/tr[2]/td");
    const columnCount = await columns.count();
    let coursename;
    for (let i = 2; i <= rowcount; i++) {
      for (let j = 1; j <= columnCount; j++) {
        let text = await this.coursesTable
          .locator("xpath=.//tbody/tr[" + i + "]/td[" + j + "]")
          .textContent();
        //console.log(text);
        if (text == value) {
          coursename = await this.coursesTable
            .locator("xpath=.//tbody/tr[" + i + "]/td[2]")
            .textContent();
          console.log(`Course name which has price of 25 rs is ${coursename}`);
        }
      }
    }
    expect(coursename).toBeTruthy();
  }
}

module.exports = { unitTestCases };
