import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var games = [];
const gamesPath = path.join(__dirname, './../games');
const gameFiles = fs.readdirSync(gamesPath).filter(file => file.endsWith('.json'));

for (let i = 0; i < gameFiles.length; i++) {
    const game = path.join(gamesPath, gameFiles[i]);
    var gameJson = JSON.parse(fs.readFileSync(game));
    gameJson.id = "" + i;
    games.push(gameJson);
}

export default games;