const BasePage = require("./BasePage");

class AdminPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = "text=Add";
    this.userRoleDropdown = "(//div[@class='oxd-select-wrapper'])[1]";
    this.statusDropdown = "(//div[@class='oxd-select-wrapper'])[2]";
    this.employeeName = '[placeholder="Type for hints..."]';
    this.username = "//div[contains(@class, 'oxd-input-group')][.//label[contains(., 'Username')]]//input";
    this.password = "(//input[@type='password'])[1]";
    this.confirmPassword = "(//input[@type='password'])[2]";
    this.saveButton = 'button[type="submit"]';

    this.searchUsernameField = "//div[contains(@class, 'oxd-input-group')][.//label[contains(., 'Username')]]//input";
    this.searchButton = 'button[type="submit"]';

    this.usernameResult = ".oxd-table-cell oxd-padding-cell";
  }

  async add() {
    await this.click(this.addButton);
  }

  async inputEmployeeName(employeeName) {
    await this.fill(this.employeeName, employeeName);

    // Tunggu sampai hasil muncul lalu klik
    await this.page.locator(`text=${employeeName}`).click();
  }

  async admin(username, password, confirmPassword) {
    await this.click(this.addButton);

    await this.fill(this.username, username);

    await this.fill(this.password, password);

    await this.fill(this.confirmPassword, confirmPassword);
  }

  async selectUserRole(role) {
    await this.click(this.userRoleDropdown);

    await this.click(`text=${role}`);
  }

  async selectUserStatus(status) {
    await this.click(this.statusDropdown);

    await this.click(`text=${status}`);
  }

  async save() {
    await this.click(this.saveButton);
  }

  async searchUsername(username) {
    await this.fill(this.searchUsernameField, username);
    await this.click(this.searchButton);
  }

  async isUsernameDisplayed(username) {
    return await this.page.locator(`text=${username}`).isVisible();
  }
}

module.exports = AdminPage;
