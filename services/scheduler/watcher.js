const { processLatestPatch } = require("../patchbot");

let running = false;

async function checkPatches(client) {

    if (running) return;

    running = true;

    try {

        console.log("🔎 Buscando nuevos parches...");

        const patch = await processLatestPatch();
const { publishPatch } = require("../discord/publisher");

if (patch) {

    console.log("📢 Publicando en Discord...");

    await publishPatch(client, patch);

    console.log("✅ Publicado.");

} else {

            console.log("No hay parches nuevos.");

        }

    } catch (err) {

        console.error(err);

    }

    running = false;

}

function startWatcher(client, interval = 15 * 60 * 1000) {

    console.log("Watcher iniciado.");

    checkPatches(client);

    setInterval(() => {

        checkPatches(client);

    }, interval);

}

module.exports = {

    startWatcher

};