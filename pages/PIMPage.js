const BasePage = require("./BasePage");

class PIMPage extends BasePage {
  constructor(page) {
    super(page);

    this.addButton = "text=Add";
    this.firstName = '[name="firstName"]'; 
    this.lastname = '[name="lastName"]';
    this.createLoginDetailsToggle = ".oxd-switch-wrapper"; 
    this.uploadInput = page.locator(".oxd-file-input");

    this.uploadPIMImage = '[alt="profile picture"]';
    
    this.saveButton = 'button[type="submit"]';

    this.searchUsernameField = '[placeholder="Type for hints..."]';
    this.searchButton = 'button[type="submit"]';

    this.usernameResult = ".oxd-table-row oxd-table-row--with-border oxd-table-row--clickable";
  }

  async add() {
    await this.click(this.addButton);
  }

  async dataPIM(firstname, lastname) {
    await this.click(this.addButton);

    await this.fill(this.firstName, firstname);

    await this.fill(this.lastname, lastname);

    //await this.click(this.createLoginDetailsToggle);
  }

  async uploadImage(filePath) {
    
    await this.uploadInput.setInputFiles(filePath);

  }

  async save() {
    await this.click(this.saveButton);
  }

  async searchname(name) {
    await this.fill(this.searchUsernameField, name);
    await this.page.locator(`text=${name}`).click();

    await this.click(this.searchButton);
  }

  async isNameDisplayed(name) {
    return await this.page.locator(`text=${name}`).isVisible();
  }
}

module.exports = PIMPage;
