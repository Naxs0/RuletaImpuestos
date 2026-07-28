const { askGemini } = require("./gemini");
const { translationPrompt } = require("./prompts");

async function translatePatch(patch) {

    const prompt = translationPrompt(patch);

    const response = await askGemini(prompt);

    try {

        return JSON.parse(response);

    } catch (err) {

        console.error("Respuesta de Gemini:");

        console.log(response);

        throw new Error("Gemini devolvió un JSON inválido.");

    }

}

module.exports = {

    translatePatch

};