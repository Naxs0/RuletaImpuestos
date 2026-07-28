const { processLatestPatch } = require("../services/patchbot");

(async () => {

    const patch = await processLatestPatch();

    console.log(patch);

})();