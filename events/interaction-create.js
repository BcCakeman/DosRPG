import { Events } from 'discord.js';
import { buildResponse } from '../utils/buildResponse.js';
import games from '../utils/gamesLoader.js';
import zlib from 'zlib';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        //Interaction response for the optionSelector
        if (interaction?.isStringSelectMenu() && interaction?.customId === "optionSelect") {

            var oldSaveState = JSON.parse(zlib.inflateSync(Buffer.from(interaction.message.content, 'base64')).toString());
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