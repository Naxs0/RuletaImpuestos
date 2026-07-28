const { getLatestPatch } = require("./detector");
const { downloadPatch } = require("./downloader");
const { parsePatch } = require("./parser");
const { savePatch, hasPatch } = require("./storage");

async function processLatestPatch() {

    const latest = await getLatestPatch();
    console.log(latest);

    if (!latest) {
        throw new Error("No se pudo obtener el último parche.");
    }

    if (hasPatch(latest.id)) {

        console.log("📄 El último parche ya está almacenado.");
        return null;

    }

    console.log("====================================");
    console.log("🆕 Nuevo parche encontrado");
    console.log(`📄 ${latest.title}`);
    console.log(`🆔 ${latest.id}`);
    console.log("====================================");

    console.log("⬇️ Descargando artículo...");

    const downloaded = await downloadPatch(latest.url);

    console.log("🧩 Procesando contenido...");

    const parsed = parsePatch(
        downloaded.title,
        downloaded.html
    );

    const patch = {

        id: latest.id,
        title: parsed.title,
        url: latest.url,
        downloadedAt: new Date().toISOString(),
        intro: parsed.intro,
        sections: parsed.sections

    };

    if (!patch.sections || patch.sections.length === 0) {
        throw new Error("El parche fue descargado, pero no contiene secciones.");
    }

    console.log("💾 Guardando parche...");

    savePatch(patch);

    console.log("✅ Parche almacenado correctamente.");

    return patch;

}

module.exports = {
    processLatestPatch
};