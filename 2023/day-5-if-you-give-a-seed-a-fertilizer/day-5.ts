import * as fs from 'fs';
import { AlmanacParser } from './almanac-parser';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const input = fs.readFileSync('./day-5-if-you-give-a-seed-a-fertilizer/day-5-input.txt', 'utf-8');
    const almanac = input.split('\r\n');
    const resultPart1 = AlmanacParser.mapSeedsToLocations(almanac);
    console.log('Lowest location number that corresponds to any of the initial seed numbers: ', Math.min(...resultPart1));

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}
