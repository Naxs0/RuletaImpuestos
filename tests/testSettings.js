const {
    setPatchChannel,
    getPatchChannel
} = require("../services/discord/settings");

setPatchChannel("123456789");

console.log(getPatchChannel());