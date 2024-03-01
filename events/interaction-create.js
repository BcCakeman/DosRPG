import { Events } from 'discord.js';
import { buildResponse } from '../utils/buildResponse.js';
import games from '../utils/gamesLoader.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        //IF we have a button do this
        if (interaction?.isButton()) {

            const oldEmbed = interaction.message.embeds[0];
            var oldSaveState = JSON.parse(oldEmbed.footer.text);
            var newSaveState = oldSaveState;

            for (const game of games) {
                if (oldSaveState.gameId === game.id) {
                    
                    for (const scene of game.level) {
                        if (oldSaveState.currentScene === scene.id) {
                            
                            const option = scene.options[interaction.customId];
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