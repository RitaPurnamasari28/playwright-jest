const { launchBrowser, closeBrowser } = require("../../utils/browser");
const { addResult, createExcel } = require("../../utils/excelReport");

const LoginPage = require("../../pages/LoginPage");

const urls = require("../../config/urls.json");

const EXPECTED_ERROR = "Invalid credentials";

describe("Login Failed Scenario", () => {
  let browser;
  let page;
  let loginPage;

  beforeAll(async () => {
    browser = await launchBrowser();

    page = browser.page;

    loginPage = new LoginPage(page);
  });

  afterAll(async () => {
    await closeBrowser();
  });

  test("User login with incorrect password", async () => {
    try {
      await loginPage.open(urls.baseUrl);

      await loginPage.login("Admin", "password123");

      const errorElement = page.locator(".oxd-alert-content-text");

      await errorElement.waitFor();

      const actualError = await errorElement.textContent();

      expect(actualError.trim()).toBe(EXPECTED_ERROR);

      // Jika berhasil menemukan error message
      addResult(
        "User login with incorrect password",
        EXPECTED_ERROR,
        `System successfully displayed: "${EXPECTED_ERROR}"`,
        "PASS",
      );
    } catch (error) {
      addResult(
        "User login with incorrect password",
        EXPECTED_ERROR,
        `Assertion failed or timeout occurred: ${error.message.split("\n")[0]}`,
        "FAIL",
      );

      throw error;
    }
  });
});
