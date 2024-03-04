import { SlashCommandBuilder } from 'discord.js';
import { refreshGames } from '../../utils/gamesLoader.js';

const data = new SlashCommandBuilder()
    .setName('refresh-games')
    .setDescription('Refreshes all the games. Imported games will need to be reimported.');

async function execute(client, interaction) {

    refreshGames();
    interaction.reply("Refreshed games! Use /view-games to see the new list of playable games.");
}

export default {
    data,
    execute
};