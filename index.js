// Require the necessary discord.js classes
import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert {type: "json"};
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { games, refreshGames } from './utils/gamesLoader.js';

//*****************************CREATE CLIENT********************************/
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

//*****************************LOAD GAMES********************************/
refreshGames();
console.log(`Loaded ${games.length} games.`);

//*****************************LOAD COMMANDS********************************/
//Set client commands from js files in the commands folder
client.commands = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
var commandsCount = 0;

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = ("file:///" + path.join(commandsPath, file));
        await import(filePath)
            .then((result) => {
                const command = result.default;
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    commandsCount++;
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            })
            .catch((error) => {
                console.error('Error during dynamic module import:', error);
            });;
    }
}
console.log(`Loaded ${commandsCount} commands.`)

//event listener to call commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

//*****************************LOAD EVENTS********************************/
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
var eventsCount = 0;

for (const file of eventFiles) {
    const filePath = ("file:///" + path.join(eventsPath, file));
    await import(filePath)
        .then((result) => {
            const event = result.default;

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            eventsCount++;
        })
        .catch((error) => {
            console.error('Error during dynamic module import:', error);
        });;
}
console.log(`Loaded ${eventsCount} events.`)

//*****************************LOGIN********************************/
client.login(config.token);