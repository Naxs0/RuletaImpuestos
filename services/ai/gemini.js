const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function askGemini(prompt) {

    const response = await ai.interactions.create({
        model: process.env.GEMINI_MODEL,
        input: prompt
    });

    return cleanResponse(response.output_text);

}

function cleanResponse(text) {

    if (!text)
        return "";

    return text
        .replace(/^```json/i, "")
        .replace(/^```/i, "")
        .replace(/```$/i, "")
        .trim();

}

module.exports = {

    askGemini,

    ai

};