const BasePage = require("./BasePage");

class DashboardPage extends BasePage {

    constructor(page) {

        super(page);

        this.dashboard = 'text=Time at Work';
        this.adminMenu = "text=Admin";
        this.pimMenu = "text=PIM";
    }

    async getDashboard() {
        return await this.getText(this.dashboard);
    }

    async clickAdmin() {
        await this.click(this.adminMenu);
    }

    async clickpim() {
        await this.click(this.pimMenu);
    }

}

module.exports = DashboardPage;