const { reusablePage } = require("./reusablePage");
const { unitTestCases } = require("./unitTestCases");

class POmanager {
  constructor(page, context, tc_id, attach) {
    this.page = page;
    this.context = context;
    this.tc_id = tc_id;
    this.attach = attach;
    this.ReusablePage = new reusablePage(this.page, this.context, this.tc_id, this.attach);
    this.UnitTestCases = new unitTestCases(this.page, this.context);
  }
  async getUnitTestCasesPage() {
    return this.UnitTestCases;
  }
  async getReusablePage() {
    return this.ReusablePage;
  }
}

module.exports = { POmanager };
