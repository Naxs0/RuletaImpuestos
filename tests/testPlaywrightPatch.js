const { chromium } = require("playwright");

(async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto(
        "https://patchbot.io/games/albion-online/articles/888-radiant-wilds-patch-4",
        {
            waitUntil: "networkidle"
        }
    );

    await page.waitForTimeout(3000);

    const articulo = page.locator(".UpdateNotesPage__Article");

    console.log("Existe:", await articulo.count());

    console.log("--------------------------------");

    console.log(await articulo.innerText());

    await browser.close();

})();