const axios = require("axios");
const cheerio = require("cheerio");

const PATCHBOT_URL = "https://patchbot.io/games/albion-online";

async function getLatestPatch() {

    const { data } = await axios.get(PATCHBOT_URL, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    });

    const $ = cheerio.load(data);

    const article = $('a[href*="/games/albion-online/articles/"]').first();

    const url = article.attr("href");
    const title = article.text().trim();

    // Extraer el ID desde la URL
    const match = url.match(/articles\/(\d+)-/);

    const id = match ? Number(match[1]) : null;

    return {

        id,

        title,

        url

    };

}

module.exports = {
    getLatestPatch
};