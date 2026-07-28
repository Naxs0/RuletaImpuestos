require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits,
    Events
} = require("discord.js");

// NUEVO
const { startWatcher } = require("./services/scheduler/watcher");

// Crear el cliente del bot
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Colección donde se guardarán los comandos
client.commands = new Collection();

// Ruta de la carpeta commands
const commandsPath = path.join(__dirname, "commands");

// Leer todos los archivos .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

// Cargar automáticamente cada comando
for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);

    const command = require(filePath);

    client.commands.set(command.data.name, command);

}

// Cuando el bot inicia
client.once(Events.ClientReady, readyClient => {

    console.log("====================================");
    console.log(`✅ Bot conectado como ${readyClient.user.tag}`);
    console.log(`📦 Comandos cargados: ${client.commands.size}`);
    console.log("====================================");

    // Iniciar el comprobador automático de parches
    startWatcher(client);

});

// Cuando alguien usa un Slash Command
client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (interaction.replied || interaction.deferred) {

            await interaction.followUp({
                content: "❌ Ocurrió un error al ejecutar el comando.",
                ephemeral: true
            });

        } else {

            await interaction.reply({
                content: "❌ Ocurrió un error al ejecutar el comando.",
                ephemeral: true
            });

        }

    }

});

client.login(process.env.TOKEN);