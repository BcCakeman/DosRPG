import { Events } from 'discord.js';
import { buildResponse } from '../utils/buildResponse.js';
import games from '../utils/gamesLoader.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        //IF we have a button do this
        if (interaction?.isButton()) {

            console.log("got buttom interaction. ID: " + interaction.customId);
            console.log("interaction username:  " + interaction.user.username);
            const oldEmbed = interaction.message.embeds[0];
            var oldSaveState = JSON.parse(oldEmbed.footer.text);
            let newSaveState = oldSaveState;

            for (const game of games) {
                if (oldSaveState.gameId === game.id) {
                    
                    console.log(`game: ${game.name}`);
                    for (const scene of game.level) {
                        if (oldSaveState.currentScene === scene.id) {
                            
                            console.log(`scene: ${scene.name}`);
                            
                            const option = scene.options[interaction.customId];
                            console.log(option);

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