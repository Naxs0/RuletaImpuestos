const { loadPatch } = require("../services/patchbot/storage");
const { createPatchEmbeds } = require("../services/discord/publisher");

const patch = loadPatch(888);

const embeds = createPatchEmbeds(patch);

console.log(`Embeds creados: ${embeds.length}`);

embeds.forEach((embed, index) => {

    console.log("\n====================");

    console.log(`Embed ${index + 1}`);

    console.dir(embed.toJSON(), { depth: null });

});