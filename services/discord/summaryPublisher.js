const { EmbedBuilder } = require("discord.js");
const { getPatchChannel } = require("./settings");

async function publishSummary(client, summary) {

    const channelId = getPatchChannel();

    const channel = await client.channels.fetch(channelId);

    const embed = new EmbedBuilder()
        .setColor("#00C853")
        .setTitle("🤖 Resumen IA")
        .setDescription(summary)
        .setFooter({
            text: "Albion Ruleta"
        })
        .setTimestamp();

    await channel.send({
        embeds: [embed]
    });

}

module.exports = {
    publishSummary
};