const { getLatestPatch } = require("./services/patchbot/detector");

(async () => {

    const patch = await getLatestPatch();

    console.log(patch);

})();