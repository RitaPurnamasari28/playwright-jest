const { launchBrowser, closeBrowser } = require("../../utils/browser");
const { addResult } = require("../../utils/excelReport");
const DashboardPage = require("../../pages/DashboardPage");
const AdminPage = require("../../pages/AdminPage");
const LoginPage = require("../../pages/LoginPage");

const urls = require("../../config/urls.json");

const credential = require("../../config/credentials.json");

const EXPECTED_USERNAME = "linda123";

describe("Add admin", () => {
  let page;
  let loginPage;
  let dashboardPage;
  let adminPage;

  beforeAll(async () => {
    const browser = await launchBrowser();
    page = browser.page;

    loginPage = new LoginPage(page);

    dashboardPage = new DashboardPage(page);

    adminPage = new AdminPage(page);
  });

  afterAll(async () => {
    await closeBrowser();
  });

  test("Add Admin", async () => {
    try {
      await loginPage.open(urls.baseUrl);

      await loginPage.login(credential.username, credential.password);
      await dashboardPage.clickAdmin();

      await adminPage.add();

      await adminPage.selectUserRole("ESS");

      await adminPage.selectUserStatus("Enabled");

      await adminPage.inputEmployeeName("Linda  Anderson");

      await adminPage.admin(
        "linda123",
        "Password123!tryiyuertyier",
        "Password123!tryiyuertyier",
      );

      await adminPage.save();

      await page.waitForTimeout(9000);

      await adminPage.searchUsername(EXPECTED_USERNAME);

      //const username = await adminPage.getUsername();

      await page.waitForTimeout(9000);

      const isDisplayed =
        await adminPage.isUsernameDisplayed(EXPECTED_USERNAME);

      expect(isDisplayed).toBe(true);

      // Jika berhasil menemukan error message
      addResult(
        "Add admin",
        EXPECTED_USERNAME,
        `System successfully displayed: "linda123"`,
        "PASS",
      );
    } catch (error) {
      addResult(
        "Add admin",
        EXPECTED_USERNAME,
        `Assertion failed or timeout occurred`,
        "FAIL",
      );

      throw error;
    }
  });
});
