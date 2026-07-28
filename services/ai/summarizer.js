const { askGemini } = require("./gemini");
const { summaryPrompt } = require("./prompts");

async function summarizePatch(patch) {

    const prompt = summaryPrompt(patch);

    return await askGemini(prompt);

}

module.exports = {

    summarizePatch

};