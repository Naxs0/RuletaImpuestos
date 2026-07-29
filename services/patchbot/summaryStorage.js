const fs = require("fs");
const path = require("path");

const SUMMARY_DIR = path.join(
    __dirname,
    "../../data/summaries"
);

function loadSummary(id) {

    const file = fs.readdirSync(SUMMARY_DIR)
        .find(f => f.startsWith(id + "-"));

    if (!file)
        return null;

    return fs.readFileSync(
        path.join(SUMMARY_DIR, file),
        "utf8"
    );

}

module.exports = {

    loadSummary

};