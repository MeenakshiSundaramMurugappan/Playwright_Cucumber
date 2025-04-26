const ExcelJS = require("exceljs");
const path = require("path");

class helper {
  async getExcelData(sheetname, tc_name, column_name) {
    const workbook = new ExcelJS.Workbook();
    let filepath = path.resolve(
      "__dirname",
      "..",
      "datatables",
      "excel",
      "data.xlsx"
    );
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet(sheetname);
    const totalrows = worksheet.rowCount;
    const totalcolumns = worksheet.columnCount;
    const exprowandcolumn = { row: -1, column: -1 };
    //*****  Getting Expected Row Count based on testcase name  *****//
    for (let i = 1; i <= totalrows; i++) {
      if (worksheet.getRow(i).getCell(2).value == tc_name) {
        exprowandcolumn.row = i;
        break;
      }
    }
    //***** Getting Expected Column Count based on column heading name *****//
    for (let i = 1; i <= totalcolumns; i++) {
      if (worksheet.getRow(1).getCell(i).value == column_name) {
        exprowandcolumn.column = i;
        break;
      }
    }
    const expectedCellvalue = worksheet
      .getRow(exprowandcolumn.row)
      .getCell(exprowandcolumn.column).value;
    return expectedCellvalue;
  }

  async getSelectedTestcasesTobeExecuted() {
    const workbook = new ExcelJS.Workbook();
    let filepath = path.resolve(__dirname, "..", "RunManager.xlsx");
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet("RunManager");
    const rowcount = worksheet.rowCount;
    let testcases = [];
    for (let i = 1; i <= rowcount; i++) {
      if (worksheet.getRow(i).getCell(4).value === "Yes") {
        testcases.push(worksheet.getRow(i).getCell(3).value);
      }
    }
    testcases = testcases.join(" ");
    return testcases;
  }

  async writeTestResultsinRunManager(tc_name, featurename, testcaseresult) {
    const workbook = new ExcelJS.Workbook();
    let filepath = path.resolve(__dirname, "..", "RunManager.xlsx")
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet("RunManager");
    const rowcount = worksheet.rowCount;
    for(let i=1; i<=rowcount; i++)
    {
        if(worksheet.getRow(i).getCell(2).value==tc_name && (worksheet.getRow(i).getCell(3).value).includes(featurename))
        {
            let cell = worksheet.getRow(i).getCell(5);
            cell.value = testcaseresult;
            break;
        }
    }
    await workbook.xlsx.writeFile(filepath);
  }
}

module.exports = { helper };
