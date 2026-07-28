const { processLatestPatch } = require("../services/patchbot");

(async () => {

    try {

        const patch = await processLatestPatch();

        console.log("\n===== RESULTADO =====");
        console.dir(patch, { depth: null });

    } catch (err) {

        console.error(err);

    }

})();