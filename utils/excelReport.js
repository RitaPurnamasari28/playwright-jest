const ExcelJS = require("exceljs");
const fs = require("fs-extra");
const REPORT_DIR = "./reports";

const RESULT_FILE = "./reports/results.json";

async function addResult(testCase, expectedResult, actualResult, status) {
  await fs.ensureDir(REPORT_DIR);
  let results = [];

  if (await fs.pathExists(RESULT_FILE)) {
    results = await fs.readJson(RESULT_FILE);
  }

  results.push({
    testCase,
    expectedResult,
    actualResult,
    status,
    executionTime: new Date().toLocaleString(),
  });

  await fs.writeJson(RESULT_FILE, results, { spaces: 2 });
}
async function createExcel() {
  await fs.ensureDir("./reports");

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Automation Report");

  worksheet.columns = [
    { header: "No", key: "no", width: 8 },
    { header: "Test Case", key: "testCase", width: 35 },
    { header: "Expected Result", key: "expectedResult", width: 35 },
    { header: "Actual Result", key: "actualResult", width: 40 },
    { header: "Status", key: "status", width: 15 },
    { header: "Execution Time", key: "executionTime", width: 25 },
  ];

  const results = await fs.readJson(RESULT_FILE);

  results.forEach((result, index) => {
    worksheet.addRow({
      no: index + 1,

      ...result,
    });
  });

  await workbook.xlsx.writeFile("./reports/TestReport.xlsx");

  await fs.remove(RESULT_FILE);

  console.log("Excel report berhasil dibuat.");
}

module.exports = {
  addResult,
  createExcel,
};
