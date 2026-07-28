const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../../data/settings.json");

function getSettings() {

    return JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );

}

function saveSettings(settings) {

    fs.writeFileSync(
        FILE,
        JSON.stringify(settings, null, 4),
        "utf8"
    );

}

function getPatchChannel() {

    return getSettings().patchChannel;

}

function setPatchChannel(id) {

    const settings = getSettings();

    settings.patchChannel = id;

    saveSettings(settings);

}

module.exports = {

    getPatchChannel,

    setPatchChannel

};