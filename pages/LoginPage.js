const BasePage = require("./BasePage");

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.username = '[name="username"]';
        this.password = '[name="password"]';
        this.loginButton = 'button[type="submit"]';
    }

    
    async login(username, password) {


        await this.fill(this.username, username);

        await this.fill(this.password, password);

        await this.click(this.loginButton);
    }

}

module.exports = LoginPage;