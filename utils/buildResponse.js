import { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export async function buildResponse(game, saveState) {

    const titleText = game.name;
    var sceneDescription = "default description";
    const spacerField = {
        name: " ",
        value: '\nSaveState:',
        inline: false
    }
    var footer = {
        text: "Default"
    }

    if (!saveState) {
        saveState = {
            gameId: "" + game.id,
            currentScene: "0"
        };
    }

    var buttons = new ActionRowBuilder();

    for (const scene of game.level) {
        if (scene.id === saveState.currentScene) {
            sceneDescription = scene.text;
            footer.text = JSON.stringify(saveState);

            for (let i = 0; i < scene.options.length; i++) {
                const newButton = new ButtonBuilder()
                    .setCustomId("" + i)
                    .setLabel(scene.options[i][0])
                    .setStyle(ButtonStyle.Primary);
                buttons.addComponents(newButton);
            }
        }
    }

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(titleText)
        .setDescription(sceneDescription)
        .addFields(spacerField)
        .setFooter(footer);

    return ({
        embeds: [embed],
        components: [buttons]
    });

}