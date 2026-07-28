const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: true
    });

    console.log("✅ Playwright funcionando");

    await browser.close();
})();