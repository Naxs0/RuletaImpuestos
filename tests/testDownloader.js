const { getLatestPatch } = require("./services/patchbot/detector");
const { downloadPatch } = require("./services/patchbot/downloader");

(async () => {

    const patch = await getLatestPatch();

    const $ = await downloadPatch(patch.url);

    console.log($.html().includes("__NUXT__"));
    console.log($.html().includes("__NEXT_DATA__"));
    console.log($.html().includes("application/json"));
    console.log($.html().includes("application/ld+json"));

})();