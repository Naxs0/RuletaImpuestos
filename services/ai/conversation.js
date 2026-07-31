const assistant = require("./assistant");
const sessionManager = require("./sessionManager");
const { deleteChannel } = require("../discord/channelManager");
const { sendLongMessage } = require("../discord/messageSender");
const memoryManager = require("./memoryManager");

async function startConversation(message, channel) {

    await channel.send(
`# 👋 Bienvenido a AlbionIA

Estoy procesando tu consulta...
`
    );

    memoryManager.add(
        message.author.id,
        "user",
        message.content
    );

    const response = await assistant.ask({

        userId: message.author.id,

        content: message.content,

        history: memoryManager.get(message.author.id),

        tools: [],

        patches: []

    });

    memoryManager.add(
        message.author.id,
        "assistant",
        response
    );

    const { sendLongMessage } = require("../discord/messageSender");

await sendLongMessage(channel, response);

}

async function handleConversation(message) {

    const session = sessionManager.getSession(message.author.id);

    if (!session) return false;

    if (session.channelId !== message.channel.id) {
        return false;
    }

    sessionManager.resetTimeout(message.author.id, async () => {

        const channel = message.guild.channels.cache.get(session.channelId);

        if (channel) {
            await deleteChannel(channel);
        }

        sessionManager.removeSession(message.author.id);
        memoryManager.clear(message.author.id);

    });

    // Guardar mensaje del usuario
    memoryManager.add(
        message.author.id,
        "user",
        message.content
    );

    // Consultar a Gemini con el historial
    const response = await assistant.ask({

        userId: message.author.id,

        content: message.content,

        history: memoryManager.get(message.author.id),

        tools: [],

        patches: []

    });

    // Guardar respuesta de la IA
    memoryManager.add(
        message.author.id,
        "assistant",
        response
    );

    await sendLongMessage(message.channel, response);

    return true;

}

module.exports = {
    handleConversation,
    startConversation
};