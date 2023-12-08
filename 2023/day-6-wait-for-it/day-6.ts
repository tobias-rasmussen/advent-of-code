import { readDistancesToBeat, readDurations } from "./inputParser";
import { Race } from "./race";
import * as fs from 'fs';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const words = fs.readFileSync('./day-6-wait-for-it/day-6-input.txt', 'utf-8');
    const races = words.split('\r\n');
    const resultPart1 = productOfWaysToWin(races);
    console.log('Product of ways to win each race: ', resultPart1);

    const durationOfBigRace = parseInt(readDurations(races[0]).join(''));
    const recordOfBigRace = parseInt(readDistancesToBeat(races[1]).join(''));
    const resultPart2 = new Race(durationOfBigRace).waysToBeat(recordOfBigRace);
    console.log('Ways to win the single big race: ', resultPart2);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}


export function productOfWaysToWin(input: string[]) {
    const durations = readDurations(input[0]);
    const records = readDistancesToBeat(input[1]);
    
    let result = 1;
    for (let i = 0; i < durations.length; i++) {
        const race = new Race(durations[i]);
        result *= race.waysToBeat(records[i]);
    }
    return result;
}