import { buildResponse } from "./buildResponse.js";

export function interpreter(game, saveState, interaction) {

    var response = null;
    switch (game.format) {
        case "v1":
            response = interpreterV1(game, saveState, interaction);
            console.log(`response: ${response}`);
            break;
        case "v2":

            break;

        default:
            response = "it's all gone horribly wrong...";
            break;

    }
    return response;
}

function interpreterV1(game, saveState, interaction) {

    //If we are given so saveState, then it is a new game and we must define the initial saveState
    if (!saveState) {
        saveState = {
            gameId: "" + game.id,
            currentScene: "0"
        };
        for (const scene of game.level) {
            if (saveState.currentScene === scene.id) {
                return buildResponse(game, saveState, scene.options);
            }
        }
    } else {

        for (const scene of game.level) {
            if (saveState.currentScene === scene.id) {

                const option = scene.options[interaction.values[0]];

                var newSaveState = saveState;
                newSaveState.currentScene = option[1];

                var newOptions = null;
                for (const newScene of game.level) {
                    if (newSaveState.currentScene === newScene.id) {
                        newOptions = newScene.options;
                     }
                }

                return buildResponse(game, newSaveState, newOptions);
            }
        }
    }
}

function interpreterV2(game, saveState, interaction) {

    //If we are given so saveState, then it is a new game and we must define the initial saveState
    if (!saveState) {
        saveState = {
            gameId: "" + game.id,
            currentScene: "0"
        };
    }

    for (const scene of game.level) {
        if (saveState.currentScene === scene.id) {

            const option = scene.options[interaction.values[0]];

            var newSaveState = saveState;
            newSaveState.currentScene = option[1];

            return buildResponse(game, newSaveState);
        }
    }
}