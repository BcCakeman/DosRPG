import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

async function execute(client, interaction) {
    interaction.reply('Pong!');
}

export default {
    data,
    execute
};