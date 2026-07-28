const { processLatestPatch } = require("./index");

const { translatePatch } = require("../ai/translator");
const { summarizePatch } = require("../ai/summarizer");

const {
    hasTranslation,
    loadTranslation,
    saveTranslation,
    hasSummary,
    loadSummary,
    saveSummary
} = require("../ai/cache");

const { publishPatch } = require("../discord/publisher");
const { publishSummary } = require("../discord/summaryPublisher");

async function runPatchWorkflow(client) {

    // Buscar un nuevo parche
    const patch = await processLatestPatch();

    if (!patch)
        return false;

    //--------------------------------------------------
    // Traducción
    //--------------------------------------------------

    let translated;

    if (hasTranslation(patch.id)) {

        console.log("📂 Traducción encontrada.");

        translated = loadTranslation(patch.id);

    } else {

        console.log("🌎 Traduciendo parche...");

        translated = await translatePatch(patch);

        saveTranslation(
            patch.id,
            translated
        );

        console.log("✅ Traducción guardada.");

    }

    //--------------------------------------------------
    // Publicación
    //--------------------------------------------------

    console.log("📨 Publicando parche...");

    await publishPatch(client, translated);

    console.log("✅ Parche publicado.");

    //--------------------------------------------------
    // Espera
    //--------------------------------------------------

    console.log("⏳ Esperando 5 segundos...");

    await new Promise(resolve => setTimeout(resolve, 5000));

    //--------------------------------------------------
    // Resumen
    //--------------------------------------------------

    let summary;

    if (hasSummary(patch.id)) {

        console.log("📂 Resumen encontrado.");

        summary = loadSummary(patch.id);

    } else {

        console.log("🤖 Generando resumen...");

        summary = await summarizePatch(translated);

        saveSummary(
            patch.id,
            summary
        );

        console.log("✅ Resumen guardado.");

    }

    //--------------------------------------------------
    // Publicar resumen
    //--------------------------------------------------

    console.log("📨 Publicando resumen...");

    await publishSummary(
        client,
        summary
    );

    console.log("✅ Resumen publicado.");

    return true;

}

module.exports = {

    runPatchWorkflow

};