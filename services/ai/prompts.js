const albionTerms = require("./albionTerms");
const personality = require("./personality");

function translationPrompt(patch) {

    return `
Eres un traductor profesional y experto en Albion Online.

Recibirás un parche en formato JSON.

Tu tarea es traducirlo completamente al español.

REGLAS OBLIGATORIAS:

- No elimines información.
- No inventes información.
- Mantén EXACTAMENTE la misma estructura JSON.
- Mantén el mismo orden.
- No cambies nombres de propiedades.
- Devuelve únicamente JSON válido.
- No uses markdown.

NO traduzcas estos términos oficiales:

${albionTerms.join("\n")}

Parche:

${JSON.stringify(patch, null, 2)}
`;

}

function summaryPrompt(patch) {

    return `
Eres un jugador veterano de Albion Online.

Resume únicamente los cambios más importantes.

Máximo 10 puntos.

Parche:

${JSON.stringify(patch, null, 2)}
`;

}

function assistantPrompt(context) {

    const history = context.history.length
        ? context.history
            .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
            .join("\n\n")
        : "No hay conversación previa.";

    return `
${personality}

----------------------------------------
HISTORIAL DE LA CONVERSACIÓN
----------------------------------------

${history}

----------------------------------------
MENSAJE ACTUAL
----------------------------------------

${context.content}

----------------------------------------

Responde únicamente al último mensaje teniendo en cuenta todo el historial.
`;

}

module.exports = {

    translationPrompt,

    summaryPrompt,

    assistantPrompt

};