const {
    ChannelType,
    PermissionFlagsBits
} = require("discord.js");

const CATEGORY_NAME = "AlbionIA";

async function getOrCreateCategory(guild) {

    let category = guild.channels.cache.find(channel =>
        channel.type === ChannelType.GuildCategory &&
        channel.name === CATEGORY_NAME
    );

    if (category) return category;

    category = await guild.channels.create({
        name: CATEGORY_NAME,
        type: ChannelType.GuildCategory
    });

    return category;

}

async function createPrivateChannel(guild, user) {

    const category = await getOrCreateCategory(guild);

    const channel = await guild.channels.create({
        name: "albionia",
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: [PermissionFlagsBits.ViewChannel]
            },
            {
                id: user.id,
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ReadMessageHistory
                ]
            },
            {
                id: guild.members.me.id,
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ManageChannels,
                    PermissionFlagsBits.ReadMessageHistory
                ]
            }
        ]
    });

    return channel;

}

async function deleteChannel(channel) {

    if (!channel) return;

    await channel.delete();

}

module.exports = {
    createPrivateChannel,
    deleteChannel
};