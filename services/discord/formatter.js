const { EmbedBuilder } = require("discord.js");

function createPatchEmbeds(patch) {

    const embeds = [];

    // ===== Portada =====

    let index = "";

    for (const section of patch.sections) {
        index += `• ${section.title}\n`;
    }

    embeds.push(
        new EmbedBuilder()
            .setColor("#F39C12")
            .setTitle(`📢 ${patch.title}`)
            .setDescription(
`Se detectó un nuevo parche de Albion Online.

## Contenido

${index}`
            )
            .setFooter({
                text: `Albion Ruleta • ${new Date(patch.downloadedAt).toLocaleString("es-CL")}`
            })
    );

    // ===== Introducción =====

    if (patch.intro?.length) {

        let text = "";

        for (const block of patch.intro) {

            if (block.type === "paragraph") {
                text += block.text + "\n\n";
            }

        }

        if (text.trim()) {

            embeds.push(
                new EmbedBuilder()
                    .setColor("#3498DB")
                    .setTitle("📖 Introducción")
                    .setDescription(text)
            );

        }

    }

    // ===== Secciones =====

    for (const section of patch.sections) {

        let text = "";

        for (const block of section.blocks) {

            if (block.type === "paragraph") {

                text += block.text + "\n\n";

            }

            if (block.type === "list") {

                for (const item of block.items) {
                    text += `• ${item}\n`;
                }

                text += "\n";

            }

        }

        embeds.push(
            new EmbedBuilder()
                .setColor("#5865F2")
                .setTitle(`📊 ${section.title}`)
                .setDescription(text.substring(0, 4096))
        );

    }

    return embeds;

}

module.exports = {
    createPatchEmbeds
};