const { helper } = require("./helper");
const { exec } = require("child_process");
const testdata = new helper();
const process = require("process");
let currentdate = new Date();
const fs = require("fs");
let datetime =
  currentdate.getDate() +
  "_" +
  currentdate.getMonth() +
  "_" +
  currentdate.getFullYear() +
  "_" +
  currentdate.getHours() +
  "_" +
  currentdate.getMinutes() +
  "_" +
  currentdate.getSeconds();
process.env.current_date_time = datetime;
(async () => {
  const htmlreportpath = `./test-results/${process.env.current_date_time}/HTML_Report/cucumberreport.html`;
  const jsonreportpath = `./test-results/${process.env.current_date_time}/JSON_Report/report.json`;
  const screenshotpath = `./test-results/${process.env.current_date_time}/Screenshots/`;
  if (!fs.existsSync(screenshotpath)) {
    console.log(`Creating Dir`);
    fs.mkdirSync(screenshotpath, { recursive: true });
  }
  const htmlreportcommand = ` --format html:${htmlreportpath} `;
  const jsonreportcommand = ` --format html:${jsonreportpath} `;

  let testcases_tobeExecuted =
    await testdata.getSelectedTestcasesTobeExecuted();
  let commandline =
    "npx cucumber-js " +
    testcases_tobeExecuted +
    htmlreportcommand +
    jsonreportcommand;
  exec(commandline, (error, stdout, stderr) => {
    if (stderr) {
      console.error(`Error ${error}`);
    }
    if (stderr) {
      console.log(`stdErr ${stderr}`);
    }
    console.log(stdout);
  });
})();
