import { REST, Routes } from 'discord.js';
import config from './config.json' assert {type: "json"};

const rest = new REST().setToken(config.token);

// for global commands
rest.put(Routes.applicationCommands(config.clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);