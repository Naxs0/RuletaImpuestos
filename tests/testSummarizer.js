require("dotenv").config();

const { loadPatch } = require("../services/patchbot/storage");
const { summarizePatch } = require("../services/ai/summarizer");

(async () => {

    try {

        const patch = loadPatch(888);

        const summary = await summarizePatch(patch);

        console.log(summary);

    } catch (err) {

        console.error(err);

    }

})();