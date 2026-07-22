const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    construirLista,
    esperar,
    generarGiro,
    obtenerEmoji
} = require("../utils/ruleta");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("impuesto")
        .setDescription("🎲 Gira la ruleta del impuesto."),

    async execute(interaction) {

        const giro = generarGiro();

        // Mensaje inicial
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#5865F2")
                    .setTitle("⚔️ CONSEJO DE MORGANA ⚔️")
                    .setDescription(
                        "🎡 **Decidiendo el impuesto...**\n\n" +
                        construirLista(0)
                    )
            ]
        });

        // Posición de la flecha
        let posicion = 0;

const velocidades = [
    60,
    60,
    60,
    65,
    70,
    80,
    90,
    105,
    120,
    140,
    165,
    195,
    230,
    270,
    320
];

        // Animación
        for (let i = 0; i <= giro.pasos; i++) {

            posicion = i % giro.valores.length;

            await interaction.editReply({

                embeds: [

                    new EmbedBuilder()
                        .setColor("#5865F2")
                        .setTitle("⚔️ CONSEJO DE MORGANA ⚔️")
                        .setDescription(
                            "🎡 **Decidiendo el impuesto...**\n\n" +
                            construirLista(posicion)
                        )

                ]

            });

            const tiempo =
    velocidades[Math.min(i, velocidades.length - 1)];

await esperar(tiempo);


        }

const porcentaje = giro.valores[giro.ganador];

// Embed de suspense
const embedSuspenso = new EmbedBuilder()
    .setColor("#5865F2")
    .setTitle("⚔️ CONSEJO DE MORGANA ⚔️")
    .setDescription(
        "🏆 **El Consejo ha tomado una decisión...**\n\n" +
        "⏳ Revelando el impuesto..."
    );

await interaction.editReply({
    embeds: [embedSuspenso]
});

// Espera antes de revelar el resultado
await esperar(800);

// Embed final
const embedFinal = new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("🏆 EL CONSEJO HA DECIDIDO")
    .setDescription(
        `## ${obtenerEmoji(porcentaje)} ${porcentaje}%\n\n` +
        "⚔️ **¡Que comiencen las actividades!**"
    )
    .setFooter({
        text: "Ruleta de Impuestos • Morgana"
    })
    .setTimestamp();

await interaction.editReply({
    embeds: [embedFinal]
});

    }
};