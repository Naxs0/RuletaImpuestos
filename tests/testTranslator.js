require("dotenv").config();

const { loadPatch } = require("../services/patchbot/storage");
const { translatePatch } = require("../services/ai/translator");

(async () => {

    try {

        const patch = loadPatch(888);

        const translated = await translatePatch(patch);

        console.log(
            JSON.stringify(translated, null, 2)
        );

    } catch (err) {

        console.error(err);

    }

})();