import { buildResponse } from "./buildResponse.js";

export function interpreter(game, saveState, interaction) {

    var response = null;
    switch (game.format) {
        case "v1":
            response = interpreterV1(game, saveState, interaction);
            break;

        case "v2":
            response = interpreterV2(game, saveState, interaction);
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

                var newOptions = [];
                for (const newOption of scene.options) {
                    newOptions.push(newOption[0]);
                }

                return buildResponse(game, saveState, newOptions);
            }
        }
    } else {

        for (const scene of game.level) {
            if (saveState.currentScene === scene.id) {

                const option = scene.options[interaction.values[0]];

                var newSaveState = saveState;
                newSaveState.currentScene = option[1];

                var newOptions = [];
                for (const newScene of game.level) {
                    if (newSaveState.currentScene === newScene.id) {
                        for (const newOption of newScene.options) {
                            newOptions.push(newOption[0]);
                        }
                    }
                }

                return buildResponse(game, newSaveState, newOptions);
            }
        }
    }
}

function interpreterV2(game, saveState, interaction) {

    console.log('we got a v2 game bby!');
    //If we are given so saveState, then it is a new game and we must define the initial saveState
    if (!saveState) {
        saveState = {
            gameId: "" + game.id,
            currentScene: "0",
            variables: game.variables
        };
        for (const scene of game.level) {
            if (saveState.currentScene === scene.id) {

                var options = [];
                for (const option of scene.options) {
                    var blockedByRequiredVars = false;
                    if (option.requiredVariables != null) {
                        for (const requiredVariable of option.requiredVariables) {
                            for (const variable of saveState.variables) {
                                if (requiredVariable[0] === variable[0] && requiredVariable[1] != variable[1]) {
                                    console.log(`blocked option: ${option.text} because of requiredVariable: ${requiredVariable}`);
                                    blockedByRequiredVars = true;
                                }
                            }
                        }
                    }
                    if (blockedByRequiredVars === true) {
                        options.push(null);
                    } else {
                        options.push(option.text);
                    }
                }
                return buildResponse(game, saveState, options);
            }
        }
    } else {

        for (const scene of game.level) {
            if (saveState.currentScene === scene.id) {

                const option = scene.options[interaction.values[0]];
                console.log(`option: ${JSON.stringify(option)}`);

                var newSaveState = saveState;

                var text = null;

                for (const action of option.actions) {

                    console.log(`action: ${action}`);

                    switch (action[0]) {
                        case "setScene":
                            console.log('got a setScene!');
                            newSaveState.currentScene = action[1];
                            break;

                        case "setText":
                            console.log('got a setText!');
                            text = action[1];
                            break;

                        case "setVariable":
                            console.log(`got a setVariable!`);
                            for (let i = 0; i < newSaveState.variables.length; i++) {
                                if (newSaveState.variables[i][0] === action[1][0]) {
                                    newSaveState.variables[i][1] = action[1][1];
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }

                var newOptions = [];
                for (const newScene of game.level) {
                    if (newSaveState.currentScene === newScene.id) {
                        for (const newOption of newScene.options) {
                            var blockedByRequiredVars = false;
                            if (newOption.requiredVariables != null) {
                                for (const requiredVariable of newOption.requiredVariables) {
                                    for (const variable of newSaveState.variables) {
                                        if (requiredVariable[0] === variable[0] && requiredVariable[1] != variable[1]) {
                                            console.log(`blocked option: ${newOption.text} because of requiredVariable: ${requiredVariable}`);
                                            blockedByRequiredVars = true;
                                        }
                                    }
                                }
                            }
                            if (blockedByRequiredVars === true) {
                                newOptions.push(null);
                            } else {
                                newOptions.push(newOption.text);
                            }
                        }
                    }
                }

                return buildResponse(game, newSaveState, newOptions, text);
            }
        }
    }
}