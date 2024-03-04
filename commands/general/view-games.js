import { SlashCommandBuilder } from 'discord.js';
import { games } from '../../utils/gamesLoader.js';

const data = new SlashCommandBuilder()
    .setName('view-games')
    .setDescription('Shows all of the loaded games available to play!');

async function execute(client, interaction) {
    var outStr = "";

    for(const game of games){
        outStr += `Name: ${game.name}\n`;
        outStr += `Description: ${game.description}\n`;
        outStr += `ID: ${game.id}\n\n`;
    }
    interaction.reply(outStr);
}

export default {
    data,
    execute
};