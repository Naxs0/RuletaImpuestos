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

const {
    publishStoredPatch
} = require("./publishStoredPatch");

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
    // Publicación
    //--------------------------------------------------

    console.log("📨 Publicando parche...");

    await publishStoredPatch(
        client,
        patch.id
    );

    console.log("✅ Publicación completada.");

    return true;

}

module.exports = {

    runPatchWorkflow

};