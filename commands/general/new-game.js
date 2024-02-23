import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('new-game')
    .setDescription('Starts a new game!');

async function execute(client, interaction) {
    interaction.reply('ha lol there are no games :P');
}

export default {
    data,
    execute
};