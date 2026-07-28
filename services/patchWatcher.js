const Parser = require("rss-parser");

const parser = new Parser();

const FEED_URL = "https://forum.albiononline.com/index.php/Board/114-Patch-Notes/?format=rss";

async function checkPatchNotes() {
    console.log("🔍 Buscando Patch Notes...");

    try {
        const feed = await parser.parseURL(FEED_URL);

        if (!feed.items || feed.items.length === 0) {
            console.log("❌ No se encontraron publicaciones.");
            return;
        }

        const latest = feed.items[0];

        console.log("\n========== ÚLTIMO PARCHE ==========\n");
        console.log("📌 Título:");
        console.log(latest.title);

        console.log("\n📅 Fecha:");
        console.log(latest.pubDate);

        console.log("\n🔗 Link:");
        console.log(latest.link);

        console.log("\n🆔 GUID:");
        console.log(latest.guid);

        console.log("\n===================================");
    }
    catch (error) {
        console.error("❌ Error leyendo el RSS:");
        console.error(error);
    }
}

module.exports = { checkPatchNotes };