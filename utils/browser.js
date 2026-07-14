const { chromium } = require("playwright");
const env = require("../config/environment.json");

let browser;
let page;

async function launchBrowser() {

    browser = await chromium.launch({
        headless: env.headless
    });

    const context = await browser.newContext({
    viewport: null
});

    page = await context.newPage();

    return { browser, page };
}

async function closeBrowser() {
    await browser.close();
}

module.exports = {
    launchBrowser,
    closeBrowser
};