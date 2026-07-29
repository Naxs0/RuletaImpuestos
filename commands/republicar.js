const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const {
    publishStoredPatch
} = require("../services/patchbot/publishStoredPatch");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("republicar")
        .setDescription("📢 Republica un parche almacenado.")
        .addIntegerOption(option =>
            option
                .setName("id")
                .setDescription("ID del parche")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),

    async execute(interaction) {

        const id = interaction.options.getInteger("id");

        await interaction.reply({
            content: `🔄 Republicando el parche **${id}**...`,
            ephemeral: true
        });

        try {

            await publishStoredPatch(
                interaction.client,
                id
            );

            await interaction.editReply({
                content: `✅ Parche ${id} republicado correctamente.`
            });

        } catch (error) {

            console.error(error);

            await interaction.editReply({
                content: `❌ ${error.message}`
            });

        }

    }

};