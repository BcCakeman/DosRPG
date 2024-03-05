import { Events } from 'discord.js';
import { buildResponse } from '../utils/buildResponse.js';
import { games } from '../utils/gamesLoader.js';
import { decode } from '../utils/saveEncoder.js';
import { interpreter } from '../utils/gameInterpreter.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        console.log(`${interaction?.user.username} used interaction with id: ${interaction?.customId}`);

        //Interaction response for the optionSelector
        if (interaction?.isStringSelectMenu() && interaction?.customId === "optionSelect") {

            var saveState = decode(interaction.message.content.replaceAll("|", ""));
            var response = null;

            for (const game of games) {
                if (saveState.gameId === game.id) {

                    console.log(`game: ${game.name}, format: ${game.format}`);

                    interaction.message.delete();
                    interaction.reply(interpreter(game, saveState, interaction));
                    return;

                }
            }
        }
    }
}
