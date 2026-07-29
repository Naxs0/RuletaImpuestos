const sessionManager = require("../services/ai/sessionManager");
const {
    createPrivateChannel,
    deleteChannel
} = require("../services/discord/channelManager");
const { handleConversation } = require("../services/ai/conversation");


module.exports = {

    name: "messageCreate",

    async execute(message) {

        // Ignorar bots
        if (message.author.bot) return;

        // Ignorar mensajes privados
        if (!message.guild) return;

if (await handleConversation(message)) {
    return;
}

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
            lastActivity: Date.now(),
            timeout: null
        });

sessionManager.resetTimeout(message.author.id, async () => {

    await deleteChannel(channel);

    sessionManager.removeSession(message.author.id);

});


// Avisar en el canal de entrada
await message.reply(
    `He creado tu conversación privada: ${channel}`
);

// Iniciar la conversación
await startConversation(message, channel);

    }

};