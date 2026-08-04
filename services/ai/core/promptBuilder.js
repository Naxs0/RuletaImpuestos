function build(context, sources) {

    let prompt = context.system || "";

    // Historial
    if (context.history?.length) {

        prompt += `

===== HISTORIAL =====

`;

        for (const message of context.history) {

            prompt += `${message.role.toUpperCase()}: ${message.content}\n`;

        }

    }

    // Contexto de herramientas
    for (const source of sources) {

        if (!source.content) continue;

        prompt += `

===== ${source.source.toUpperCase()} =====

${source.content}
`;

    }

    // Mensaje actual
    prompt += `

===== USUARIO =====

${context.content}

`;

    return prompt;

}

module.exports = {
    build
};