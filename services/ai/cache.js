const fs = require("fs");
const path = require("path");

const TRANSLATED_DIR = path.join(__dirname, "../../data/translated");
const SUMMARY_DIR = path.join(__dirname, "../../data/summaries");

for (const dir of [TRANSLATED_DIR, SUMMARY_DIR]) {

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

}

function translatedFile(id) {

    return path.join(TRANSLATED_DIR, `${id}.json`);

}

function summaryFile(id) {

    return path.join(SUMMARY_DIR, `${id}.txt`);

}

// ---------- Traducciones ----------

function hasTranslation(id) {

    return fs.existsSync(translatedFile(id));

}

function loadTranslation(id) {

    return JSON.parse(
        fs.readFileSync(translatedFile(id), "utf8")
    );

}

function saveTranslation(id, patch) {

    fs.writeFileSync(
        translatedFile(id),
        JSON.stringify(patch, null, 2),
        "utf8"
    );

}

// ---------- Resúmenes ----------

function hasSummary(id) {

    return fs.existsSync(summaryFile(id));

}

function loadSummary(id) {

    return fs.readFileSync(
        summaryFile(id),
        "utf8"
    );

}

function saveSummary(id, summary) {

    fs.writeFileSync(
        summaryFile(id),
        summary,
        "utf8"
    );

}

module.exports = {

    hasTranslation,
    loadTranslation,
    saveTranslation,

    hasSummary,
    loadSummary,
    saveSummary

};