import { SlashCommandBuilder } from 'discord.js';
import { buildResponse } from '../../utils/buildResponse.js'
import { games}  from '../../utils/gamesLoader.js';
import { decode } from '../../utils/saveEncoder.js';

const data = new SlashCommandBuilder()
    .setName('new-game')
    .setDescription('Starts a new game!')
    .addStringOption(option =>
        option.setName('game')
            .setDescription('Name or ID of the game you want to play')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('save-code')
            .setDescription('If you copied the save code from a previous run, you can paste it here to continue your game!')
            .setRequired(false));

async function execute(client, interaction) {
    var gameId = interaction.options.getString('game');
    var saveState = decode(interaction.options.getString('save-code'));

    console.log(games);
    for (const game of games) {
        if (gameId === game.name || gameId == game.id) {

            interaction.reply(buildResponse(game, saveState));
            return;
        }
    }

    interaction.reply('you didnt choose a game you pathetic waste of matter');
}

export default {
    data,
    execute
};