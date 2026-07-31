const { askGemini } = require("./gemini");
const { assistantPrompt } = require("./prompts");

async function ask(context) {

    const prompt = assistantPrompt(context);

    return await askGemini(prompt);

}

module.exports = {
    ask
};