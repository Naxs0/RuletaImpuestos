const { EmbedBuilder } = require("discord.js");
const { getPatchChannel } = require("./settings");

function createPatchEmbeds(patch) {

    const embeds = [];

    const summary = patch.sections
        .map(section => `• ${section.title}`)
        .join("\n");

    embeds.push(
        new EmbedBuilder()
            .setColor("#FF8C00")
            .setTitle(`📢 ${patch.title}`)
            .setDescription(
`Se detectó un nuevo parche de Albion Online.

## Contenido

${summary}`
            )
            .setFooter({
                text: "Albion Ruleta"
            })
            .setTimestamp()
    );

    for (const section of patch.sections) {

        let description = "";

        for (const block of section.blocks) {

            if (block.type === "paragraph") {
                description += block.text + "\n\n";
            }

            if (block.type === "list") {

                for (const item of block.items) {
                    description += `• ${item}\n`;
                }

                description += "\n";
            }

        }

        while (description.length > 3900) {

            embeds.push(
                new EmbedBuilder()
                    .setColor("#FF8C00")
                    .setTitle(section.title)
                    .setDescription(description.substring(0,3900))
            );

            description = description.substring(3900);

        }

        embeds.push(
            new EmbedBuilder()
                .setColor("#FF8C00")
                .setTitle(section.title)
                .setDescription(description || "*Sin contenido*")
        );

    }

    return embeds;

}

async function publishPatch(client, patch) {

    const channelId = getPatchChannel();

    if (!channelId)
        throw new Error("No hay canal configurado.");

    const channel = await client.channels.fetch(channelId);

    if (!channel)
        throw new Error("Canal no encontrado.");

    const embeds = createPatchEmbeds(patch);

    for (const embed of embeds) {

        await channel.send({

            embeds: [embed]

        });

    }

}

module.exports = {

    createPatchEmbeds,

    publishPatch

};