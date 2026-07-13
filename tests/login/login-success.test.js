const { launchBrowser, closeBrowser } = require("../../utils/browser");
const { addResult, createExcel } = require("../../utils/excelReport");

const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");

const credential = require("../../config/credentials.json");
const urls = require("../../config/urls.json");

describe("Login Success", () => {
  let page;
  let loginPage;
  let dashboardPage;

  beforeAll(async () => {
    const browser = await launchBrowser();
    page = browser.page;

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  afterAll(async () => {
    await closeBrowser();
  });

  test("User login successfully", async () => {
    // PENTING: Tambahkan blok try di sini
    try {
      await loginPage.open(urls.baseUrl);

      // Login menggunakan username dan password
      await loginPage.login(credential.username, credential.password);

      // Verifikasi berhasil login
      const title = await dashboardPage.getDashboard();

      expect(title).toBe("Time at Work");

      addResult("User login successfully", "Time at Work", title, "PASS");
      console.log("PASS RESULT ADDED");
    } catch (error) {
      // Kalau ada error di proses login/verifikasi masuk sini
      addResult(
        "User login successfully",
        "Time at Work",
        error.message,
        "FAIL",
      );

      throw error; //
    }
  });
});
