import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {

        //IF we have a button do this
        if (interaction?.isButton()) {

            const oldEmbed = interaction.message.embeds[0];
            var saveState = oldEmbed.footer;
            console.log(saveState);
        }
    }
}