import { Events } from 'discord.js';
import { buildResponse } from '../utils/buildResponse.js';
import { games } from '../utils/gamesLoader.js';
import { decode } from '../utils/saveEncoder.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        console.log(`${interaction?.user.username} used interaction with id: ${interaction?.customId}`);

        //Interaction response for the optionSelector
        if (interaction?.isStringSelectMenu() && interaction?.customId === "optionSelect") {

            var oldSaveState = decode(interaction.message.content.replaceAll("|", ""));
            var newSaveState = oldSaveState;

            for (const game of games) {
                if (oldSaveState.gameId === game.id) {

                    for (const scene of game.level) {
                        if (oldSaveState.currentScene === scene.id) {

                            const option = scene.options[interaction.values[0]];
                            newSaveState.currentScene = option[1];

                            interaction.message.delete();
                            interaction.reply(buildResponse(game, newSaveState));
                            return;
                        }
                    }
                }
            }
        }
    }
}