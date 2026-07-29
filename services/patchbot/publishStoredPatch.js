const {
    hasTranslation,
    loadTranslation,
    hasSummary,
    loadSummary
} = require("../ai/cache");

const {
    publishPatch
} = require("../discord/publisher");

const {
    publishSummary
} = require("../discord/summaryPublisher");

async function publishStoredPatch(client, id) {

    if (!hasTranslation(id)) {
        throw new Error(`No existe la traducción ${id}.`);
    }

    if (!hasSummary(id)) {
        throw new Error(`No existe el resumen ${id}.`);
    }

    const translated = loadTranslation(id);
    const summary = loadSummary(id);

    console.log("📨 Publicando traducción...");

    await publishPatch(
        client,
        translated
    );

    console.log("⏳ Esperando 5 segundos...");

    await new Promise(resolve =>
        setTimeout(resolve, 5000)
    );

    console.log("📨 Publicando resumen...");

    await publishSummary(
        client,
        summary
    );

}

module.exports = {

    publishStoredPatch

};