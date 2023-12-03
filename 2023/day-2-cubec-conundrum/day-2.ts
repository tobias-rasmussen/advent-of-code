import { Constraint } from './constraint';
import { Game } from './game';
import * as fs from 'fs';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const words = fs.readFileSync('./day-2-input.txt', 'utf-8');
    const games = words.split('\r\n');
    const constraint: Constraint = {blueDie: 14, greenDie: 13, redDie: 12}; 
    const result = sumOfPossibleGames(games, constraint);
    console.log('Sum of all possible game IDs values: ', result);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}



export function sumOfPossibleGames(gameInputs: string[], constraint: Constraint): number {
    let result = 0;

    gameInputs.forEach(gameInput => {
        const game = new Game(gameInput);
        if (game.isPossible(constraint)) result += game.id;
    });
    
    return result;
}