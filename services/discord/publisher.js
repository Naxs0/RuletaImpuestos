const { getPatchChannel } = require("./settings");
const { createPatchEmbeds } = require("./formatter");

async function publishPatch(client, patch) {

    const channelId = getPatchChannel();

    if (!channelId)
        throw new Error("No hay canal configurado.");

    const channel = await client.channels.fetch(channelId);

    if (!channel)
        throw new Error("Canal no encontrado.");

    await channel.send({

        content:
`📢 @everyone

🔥 **¡Nuevo parche de Albion Online!**

🇪🇸 Ya está disponible la traducción completa al español.`,

        allowedMentions: {
            parse: ["everyone"]
        }

    });

    const embeds = createPatchEmbeds(patch);

    for (const embed of embeds) {

        await channel.send({
            embeds: [embed]
        });

    }

}

module.exports = {
    publishPatch
};