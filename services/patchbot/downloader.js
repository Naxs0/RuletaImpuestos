const { chromium } = require("playwright");

async function downloadPatch(url) {

    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: "networkidle"
    });

    await page.waitForSelector(".UpdateNotesPage__Article");

    const title = await page.locator("h1").first().innerText();

    const html = await page
        .locator(".UpdateNotesPage__Article")
        .innerHTML();

    await browser.close();

    return {

        title,

        html

    };

}

module.exports = {
    downloadPatch
};