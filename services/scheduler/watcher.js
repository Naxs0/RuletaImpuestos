const { runPatchWorkflow } = require("../patchbot/runner");

let running = false;

async function checkPatches(client) {

    if (running)
        return;

    running = true;

    try {

        console.log("🔎 Buscando nuevos parches...");

        const executed = await runPatchWorkflow(client);

        if (executed) {

            console.log("✅ Flujo del parche completado.");

        } else {

            console.log("📄 No hay parches nuevos.");

        }

    } catch (err) {

        console.error("❌ Error en el watcher:");

        console.error(err);

    } finally {

        running = false;

    }

}

function startWatcher(client, interval = 15 * 60 * 1000) {

    console.log("====================================");
    console.log("🚀 Watcher iniciado.");
    console.log(`⏱ Revisando cada ${interval / 60000} minutos.`);
    console.log("====================================");

    checkPatches(client);

    setInterval(() => {

        checkPatches(client);

    }, interval);

}

module.exports = {

    startWatcher

};