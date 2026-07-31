const MAX_LENGTH = 2000;

function splitMessage(text) {

    const parts = [];

    let remaining = text.trim();

    while (remaining.length > MAX_LENGTH) {

        let splitIndex = remaining.lastIndexOf("\n\n", MAX_LENGTH);

        if (splitIndex < 1000) {
            splitIndex = remaining.lastIndexOf("\n", MAX_LENGTH);
        }

        if (splitIndex < 1000) {
            splitIndex = remaining.lastIndexOf(" ", MAX_LENGTH);
        }

        if (splitIndex < 1000) {
            splitIndex = MAX_LENGTH;
        }

        parts.push(
            remaining.substring(0, splitIndex).trim()
        );

        remaining = remaining.substring(splitIndex).trim();

    }

    if (remaining.length) {
        parts.push(remaining);
    }

    return parts;

}

async function sendLongMessage(channel, text) {

    if (!text || !text.trim()) {
        return;
    }

    const messages = splitMessage(text);

    for (const message of messages) {
        await channel.send(message);
    }

}

module.exports = {
    sendLongMessage
};