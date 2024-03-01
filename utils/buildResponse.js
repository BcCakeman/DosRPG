import { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export function buildResponse(game, saveState) {

    const titleText = game.name;
    var sceneDescription = "default description";
    const spacerField = {
        name: " ",
        value: '⠀\n⠀\n⠀\n⠀\nSaveState:',    //<⠀> is an invisible character that is NOT whitespace. This is to keep discord from automatically deleting the spacer lines in the embed.
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