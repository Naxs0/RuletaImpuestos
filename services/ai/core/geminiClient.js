const { askGemini } = require("../gemini");

async function ask(prompt) {
    return askGemini(prompt);
}

module.exports = {
    ask
};