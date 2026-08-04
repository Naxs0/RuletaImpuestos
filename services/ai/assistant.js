const fs = require("fs");

const toolManager = require("./core/toolManager");
const promptBuilder = require("./core/promptBuilder");
const geminiClient = require("./core/geminiClient");
const { assistantPrompt } = require("./prompts");

async function ask(context) {

    const sources = await toolManager.getContext(context);

    const prompt = promptBuilder.build(
        {
            ...context,
            system: assistantPrompt()
        },
        sources
    );

    // DEBUG
    fs.writeFileSync(
        "ultimo_prompt.txt",
        prompt,
        "utf8"
    );

    console.log("========================================");
    console.log("Prompt guardado en ultimo_prompt.txt");
    console.log("Longitud:", prompt.length);
    console.log("========================================");

    try {

        return await geminiClient.ask(prompt);

    } catch (error) {

        console.error("===== ERROR GEMINI =====");
        console.error(error);

        return "⚠️ AlbionIA encontró un error interno. El problema quedó registrado para revisión.";

    }

}

module.exports = {
    ask
};