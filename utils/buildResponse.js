import { Events, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { encode } from './saveEncoder.js';

export function buildResponse(game, saveState) {

    //If we are given so saveState, then it is a new game and we must define the initial saveState
    if (!saveState) {
        saveState = {
            gameId: "" + game.id,
            currentScene: "0"
        };
    }

    //Set some embed defaults
    const titleText = game.name;
    var sceneDescription = "default description";

    //Generate Options Selector and set sceneDescription
    var options = [];
    for (const scene of game.level) {
        if (scene.id === saveState.currentScene) {
            sceneDescription = scene.text;

            for (let i = 0; i < scene.options.length; i++) {
                const newOption = new StringSelectMenuOptionBuilder()
                    .setLabel(scene.options[i][0])
                    .setValue("" + i);
                options.push(newOption);
            }
        }
    }
    var selectRow = new ActionRowBuilder();
    const optionSelect = new StringSelectMenuBuilder()
        .setCustomId('optionSelect')
        .setPlaceholder('Make a selection!')
        .addOptions(options);
    selectRow.addComponents(optionSelect);

    //Create Embed
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(titleText)
        .setDescription(sceneDescription);

    return ({
        content: `||${encode(saveState)}||`,
        embeds: [embed],
        components: [selectRow]
    });

}