const assistant = require("./assistant");
const sessionManager = require("./sessionManager");
const { deleteChannel } = require("../discord/channelManager");

async function handleConversation(message) {

    const session = sessionManager.getSession(message.author.id);

    if (!session) return false;

    if (session.channelId !== message.channel.id) {
        return false;
    }

async function startConversation(message, channel) {

    const response = await assistant.ask(
        message.author.id,
        message.content
    );

    await channel.send(
`# 👋 Bienvenido a AlbionIA

Estoy procesando tu consulta...
`
    );

    await channel.send(response);

}

    sessionManager.resetTimeout(message.author.id, async () => {

        const channel = message.guild.channels.cache.get(session.channelId);

        if (channel) {
            await deleteChannel(channel);
        }

        sessionManager.removeSession(message.author.id);

    });

    const response = await assistant.ask(
    message.author.id,
    message.content
);

await message.channel.send(response);

    return true;

}

module.exports = {
    handleConversation,
    startConversation
};