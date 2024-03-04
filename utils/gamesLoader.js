import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export var games = [];

export function refreshGames() {

    games = [];

    const gamesPath = path.join(__dirname, './../games');
    const gameFiles = fs.readdirSync(gamesPath).filter(file => file.endsWith('.json'));

    for (let i = 0; i < gameFiles.length; i++) {
        const game = path.join(gamesPath, gameFiles[i]);
        var gameJson = JSON.parse(fs.readFileSync(game));
        gameJson.id = "" + i;
        games.push(gameJson);
    }
}

export async function loadGameFromURL(url) {
    try {
        const response = await fetch(url);
        var game = await response.json();
        game.id = games.length;
        games.push(game);

        return `Loaded game from web "${game.name}"!`;
    } catch {
        return "There was an error loading that game! Make sure the url returns valid JSON...";
    }
}

export default { games, loadGameFromURL };