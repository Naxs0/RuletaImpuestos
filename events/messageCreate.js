const sessionManager = require("../services/ai/sessionManager");
const { createPrivateChannel } = require("../services/discord/channelManager");

module.exports = {

    name: "messageCreate",

    async execute(message) {

        // Ignorar bots
        if (message.author.bot) return;

        // Ignorar mensajes privados
        if (!message.guild) return;

        // Solo escuchar el canal de entrada
        if (message.channel.name !== "hablar-con-albionia") return;

        // ¿Ya tiene una sesión?
        if (sessionManager.hasSession(message.author.id)) {

            const session = sessionManager.getSession(message.author.id);

            return message.reply(
                `Ya tienes una conversación activa en <#${session.channelId}>.`
            );

        }

        // Crear canal privado
        const channel = await createPrivateChannel(
            message.guild,
            message.author
        );

        // Guardar sesión
        sessionManager.createSession({
            userId: message.author.id,
            guildId: message.guild.id,
            channelId: channel.id,
            createdAt: Date.now(),
            lastActivity: Date.now()
        });

        // Avisar en el canal de entrada
        await message.reply(
            `He creado tu conversación privada: ${channel}`
        );

        // Mensaje de bienvenida
        await channel.send(
`# 👋 Bienvenido a AlbionIA

Este será tu espacio privado.

Puedes preguntarme cualquier cosa sobre Albion Online.

La conversación se eliminará automáticamente después de **1 hora sin actividad**.

¿Qué te gustaría saber?`
        );

    }

};