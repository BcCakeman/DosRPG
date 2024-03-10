import { Events, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { encode } from './saveEncoder.js';

export function buildResponse(game, saveState, options, text) {

    //Set some embed defaults
    const titleText = game.name;
    var sceneDescription = "default description";

    //Generate Options Selector and set sceneDescription
    var menuOptions = [];
    for (const scene of game.level) {
        if (scene.id === saveState.currentScene) {
            sceneDescription = text ? text : scene.text;

            for (let i = 0; i < options.length; i++) {
                if (!options[i]) continue;
                const newOption = new StringSelectMenuOptionBuilder()
                    .setLabel(options[i])
                    .setValue("" + i);
                menuOptions.push(newOption);
            }
        }
    }
    var selectRow = new ActionRowBuilder();
    const optionSelect = new StringSelectMenuBuilder()
        .setCustomId('optionSelect')
        .setPlaceholder('Make a selection!')
        .addOptions(menuOptions);
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