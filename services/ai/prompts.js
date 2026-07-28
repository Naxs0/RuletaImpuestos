const albionTerms = require("./albionTerms");

function translationPrompt(patch) {

    return `
Eres un traductor profesional y experto en Albion Online.

Recibirás un parche en formato JSON.

Tu tarea es traducirlo completamente al español.

REGLAS OBLIGATORIAS:

- No elimines información.
- No inventes información.
- Mantén EXACTAMENTE la misma estructura JSON.
- Mantén el mismo orden de todos los elementos.
- Conserva todos los bloques, listas y párrafos.
- No cambies nombres de propiedades JSON.
- Devuelve únicamente JSON válido.
- No escribas explicaciones.
- No uses markdown.
- No uses \`\`\`json.
- Agrega emojis únicamente en los títulos cuando aporten claridad.
- No agregues emojis dentro de párrafos o listas.
- Usa un español natural y fácil de leer.

NO traduzcas estos términos oficiales de Albion Online:

${albionTerms.join("\n")}

Si no estás seguro de cómo traducir un término, déjalo en inglés.

Parche:

${JSON.stringify(patch, null, 2)}

`;
}

function summaryPrompt(patch) {

    return `
Eres un jugador veterano de Albion Online.

Recibirás un parche YA TRADUCIDO al español.

Tu misión es resumir únicamente los cambios más importantes para los jugadores.

REGLAS:

- Máximo 10 puntos.
- Ordena de lo más importante a lo menos importante.
- Usa español natural.
- No copies frases completas del parche.
- Resume las ideas.
- Si hay cambios de PvP, menciónalos.
- Si hay cambios de PvE, menciónalos.
- Si hay cambios de economía, menciónalos.
- Si hay cambios de balance, menciónalos.
- Si hay correcciones importantes, menciónalas.

Responde únicamente con texto plano.

Parche:

${JSON.stringify(patch, null, 2)}

`;

}

module.exports = {

    translationPrompt,

    summaryPrompt

};