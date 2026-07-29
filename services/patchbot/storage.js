const fs = require("fs");
const path = require("path");

const PATCH_DIR = path.join(__dirname, "../../data/patches");

if (!fs.existsSync(PATCH_DIR)) {
    fs.mkdirSync(PATCH_DIR, { recursive: true });
}

function slugify(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}

function getFileName(patch) {

    return `${patch.id}-${slugify(patch.title)}.json`;

}

function getFilePath(patch) {

    return path.join(
        PATCH_DIR,
        getFileName(patch)
    );

}

function savePatch(patch) {

    fs.writeFileSync(

        getFilePath(patch),

        JSON.stringify(patch, null, 2),

        "utf8"

    );

}

function loadPatch(id) {

    const file = fs.readdirSync(PATCH_DIR)
        .find(f => f.startsWith(id + "-"));

    if (!file)
        return null;

    return JSON.parse(

        fs.readFileSync(

            path.join(PATCH_DIR, file),

            "utf8"

        )

    );

}

function hasPatch(id) {

    return fs.readdirSync(PATCH_DIR)
        .some(f => f.startsWith(id + "-"));

}

function listPatches() {

    return fs.readdirSync(PATCH_DIR)
        .filter(f => f.endsWith(".json"));

}

function getLatestPatchId() {

    const files = listPatches();

    if (files.length === 0)
        return null;

    return Math.max(
        ...files.map(file =>
            parseInt(file.split("-")[0], 10)
        )
    );

}

module.exports = {

    savePatch,
    loadPatch,
    hasPatch,
    listPatches,
    getLatestPatchId

};