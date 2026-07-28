function createMessages(patch) {

    const messages = [];

    // Mensaje principal
    let header =
`# 📢 ${patch.title}

🆔 **Patch:** ${patch.id}
📅 **Descargado:** ${new Date(patch.downloadedAt).toLocaleString("es-CL")}

━━━━━━━━━━━━━━━━━━`;

    messages.push(header);

    // Introducción
    if (patch.intro.length) {

        let intro = "## 📖 Introducción\n\n";

        for (const block of patch.intro) {

            if (block.type === "paragraph") {

                intro += block.text + "\n\n";

            }

        }

        messages.push(intro);

    }

    // Secciones

    for (const section of patch.sections) {

        let text = `## ${section.title}\n\n`;

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

        messages.push(text);

    }

    return messages;

}

module.exports = {

    createMessages

};