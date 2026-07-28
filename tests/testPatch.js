const Parser = require("rss-parser");

const parser = new Parser();

async function test() {
    try {
        const feed = await parser.parseURL(
            "https://forum.albiononline.com/index.php/Board/114-Patch-Notes/?format=rss"
        );

        console.log(feed.items[0]);
    } catch (err) {
        console.error(err);
    }
}

test();