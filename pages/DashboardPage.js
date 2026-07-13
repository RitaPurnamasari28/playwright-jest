const BasePage = require("./BasePage");

class DashboardPage extends BasePage {

    constructor(page) {

        super(page);

        this.dashboard = 'text=Time at Work';
        this.adminMenu = "text=Admin";
    }

    async getDashboard() {
        return await this.getText(this.dashboard);
    }

    async clickAdmin() {
        await this.click(this.adminMenu);
    }

}

module.exports = DashboardPage;