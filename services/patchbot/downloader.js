const axios = require("axios");
const cheerio = require("cheerio");

async function downloadPatch(url) {

    const { data } = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);

    const raw = $("#app").attr("data-page");

    if (!raw) {
        throw new Error("No se encontró data-page.");
    }

    const json = JSON.parse(raw.replace(/&quot;/g, '"'));

    return {

        title: json.props.updateNote.name,

        html: json.props.updateNote.body

    };

}

module.exports = {
    downloadPatch
};