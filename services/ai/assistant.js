const { askGemini } = require("./gemini");

async function ask(userId, content) {

    const prompt = `
Eres AlbionIA.

Eres un asistente experto en Albion Online.

Responde siempre en español.

Si no sabes una respuesta, dilo claramente.

Pregunta del usuario:

${content}
`;

    return await askGemini(prompt);

}

module.exports = {
    ask
};