async function sendLongMessage(channel, text) {

    const MAX = 2000;

    if (text.length <= MAX) {
        return channel.send(text);
    }

    for (let i = 0; i < text.length; i += MAX) {

        await channel.send(
            text.substring(i, i + MAX)
        );

    }

}

module.exports = {
    sendLongMessage
};