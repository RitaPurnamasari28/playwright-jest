const { launchBrowser, closeBrowser } = require("../../utils/browser");
const { addResult } = require("../../utils/excelReport");
const DashboardPage = require("../../pages/DashboardPage");
const PIMPage = require("../../pages/PIMPage");
const LoginPage = require("../../pages/LoginPage");

const urls = require("../../config/urls.json");

const credential = require("../../config/credentials.json");
const { takeScreenshot } = require("../../utils/screenshot");

const EXPECTED_NAME = "Linda Anderson";

const path = require("path");
const filePath = path.join(process.cwd(), "assets", "G543ikub0AAAx4h.jpg");

describe("PIM Module", () => {
  let page;
  let loginPage;
  let dashboardPage;
  let pimPage;

  beforeAll(async () => {
    const browser = await launchBrowser();
    page = browser.page;

    loginPage = new LoginPage(page);

    dashboardPage = new DashboardPage(page);

    pimPage = new PIMPage(page);
  });

  afterAll(async () => {
    await closeBrowser();
  });

  test("Add PIM", async () => {
    try {
      await loginPage.open(urls.baseUrl);

      await loginPage.login(credential.username, credential.password);
      await dashboardPage.clickpim();

      await pimPage.add();

      await pimPage.dataPIM("Linda", "Anderson");

      await pimPage.uploadImage(filePath);

      await pimPage.save();

      //await page.waitForTimeout(9000);

      //await pimPage.searchname(EXPECTED_NAME);

      await page.waitForTimeout(90000);

      const isDisplayed = await pimPage.isNameDisplayed(EXPECTED_NAME);

      expect(isDisplayed).toBe(true);

      await takeScreenshot(page, expect.getState().currentTestName, "PASS");

      await addResult(
        "Add PIM",
        EXPECTED_NAME,
        `System successfully displayed: "Linda Anderson"`,
        "PASS",
      );
    } catch (error) {
      try {
        await takeScreenshot(page, expect.getState().currentTestName, "FAIL");
      } catch (e) {
        console.error("Screenshot failed:", e);
      }
      await addResult(
        "Add PIM",
        EXPECTED_NAME,
        "Assertion failed or timeout occurred",
        "FAIL",
      );

      throw error;
    }
  });
});
