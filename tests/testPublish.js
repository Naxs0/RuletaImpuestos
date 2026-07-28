require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const { loadPatch } = require("../services/patchbot/storage");
const { publishPatch } = require("../services/discord/publisher");
const { getPatchChannel } = require("../services/discord/settings");

const client = new Client({

    intents: [GatewayIntentBits.Guilds]

});

client.once("ready", async () => {

    console.log(`Conectado como ${client.user.tag}`);

    const patch = loadPatch(888);

    console.log("Canal:", getPatchChannel());

    await publishPatch(client, patch);

    console.log("Publicado correctamente.");

    process.exit();

});

client.login(process.env.TOKEN);