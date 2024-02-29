import { SlashCommandBuilder } from 'discord.js';
import {buildResponse} from '../../utils/buildResponse.js'

const data = new SlashCommandBuilder()
    .setName('new-game')
    .setDescription('Starts a new game!')
	.addStringOption(option =>
		option.setName('game')
			.setDescription('Name or ID of the game you want to play')
			.setRequired(true));

async function execute(client, interaction) {
    var input = interaction.options.getString('game');

    for(const game of client.games){
        if(input === game.name || input == game.Id){
            
            //interaction.reply('woe, you chose an actual game lmao\n' + JSON.stringify(game));
            interaction.reply(await buildResponse(game, null));
            return;
        }
    }

    interaction.reply('you didnt choose a game you pathetic waste of matter');
}

export default {
    data,
    execute
};