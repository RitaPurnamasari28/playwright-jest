const BasePage = require("./BasePage");

class AdminPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = "text=Add";
    this.userRoleDropdown =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div/div[2]/div/div/div[2]/i";
    //this.role = '[name="password"]';
    this.statusDropdown =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div[2]/div/div/div[2]/i";
    //this.status = '[name="password"]';
    this.employeeName = '[placeholder="Type for hints..."]';
    this.username =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[4]/div/div[2]/input";
    this.password =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[1]/div/div[2]/input";
    this.confirmPassword =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div[2]/div/div[2]/input";
    this.saveButton = 'button[type="submit"]';

    this.searchUsernameField =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input";
    this.searchButton =
      "xpath=/html/body/div/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]";

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
