const { loadPatch } = require("../services/patchbot/storage");
const { createMessages } = require("../services/discord/formatter");

const patch = loadPatch(888);

const messages = createMessages(patch);

console.log("Mensajes generados:", messages.length);

messages.forEach((m, i) => {

    console.log("\n==============================");
    console.log(`Mensaje ${i + 1}`);
    console.log("==============================");
    console.log(m);

});