import { SlashCommandBuilder } from 'discord.js';
import { buildResponse } from '../../utils/buildResponse.js'
import { loadGameFromURL } from '../../utils/gamesLoader.js';
import { decode } from '../../utils/saveEncoder.js';

const data = new SlashCommandBuilder()
    .setName('import-game')
    .setDescription('Starts a new game!')
    .addStringOption(option =>
        option.setName('url')
            .setDescription('url leading to a valid game.json')
            .setRequired(true))

async function execute(client, interaction) {
    var url = interaction.options.getString('url');

    interaction.reply(await loadGameFromURL(url));

}

export default {
    data,
    execute
};