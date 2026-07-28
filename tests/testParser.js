const { getLatestPatch } = require("./services/patchbot/detector");
const { downloadPatch } = require("./services/patchbot/downloader");
const { parsePatch } = require("./services/patchbot/parser");
const { savePatch } = require("./services/patchbot/storage");

(async () => {

    const patch = await getLatestPatch();

    const downloaded = await downloadPatch(patch.url);


const parsed = parsePatch(
    downloaded.title,
    downloaded.html
);

const patchData = {
    id: patch.id,
    title: parsed.title,
    url: patch.url,
    downloadedAt: new Date().toISOString(),
    intro: parsed.intro,
    sections: parsed.sections
};

savePatch(patchData);

console.log("Parche guardado correctamente.");
console.log(JSON.stringify(patchData, null, 2));

console.log("Parche guardado correctamente.");

console.log(JSON.stringify(parsed,null,2));



})();