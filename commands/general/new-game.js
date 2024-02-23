import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('new-game')
    .setDescription('Starts a new game!')
	.addStringOption(option =>
		option.setName('game')
			.setDescription('Name or ID of the game you want to play')
			.setRequired(true));

async function execute(client, interaction) {
    interaction.reply('ha lol there are no games :P');
}

export default {
    data,
    execute
};