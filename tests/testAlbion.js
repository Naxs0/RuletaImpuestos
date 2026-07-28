const axios = require("axios");
const cheerio = require("cheerio");

async function test() {
    try {
        const { data } = await axios.get("https://albiononline.com/update", {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
            }
        });

        console.log("✅ Página descargada correctamente");

        const $ = cheerio.load(data);

        console.log("Título de la página:");
        console.log($("title").text());

        console.log("\nCantidad de enlaces:");
        console.log($("a").length);

    } catch (err) {

        console.log(err.response?.status || err.message);

    }
}

test();