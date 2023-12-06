import * as fs from 'fs';
import { AlmanacParser } from './almanac-parser';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const input = fs.readFileSync('./day-5-if-you-give-a-seed-a-fertilizer/day-5-input.txt', 'utf-8');
    const almanac = input.split('\r\n');
    const seedsAsList = AlmanacParser.parseSeedsAsNumbers(almanac[0]);
    const resultPart1 = AlmanacParser.mapSeedsToLocations(seedsAsList, almanac);
    console.log('Lowest location number that corresponds to any of the initial seed numbers: ', Math.min(...resultPart1));

    const resultPart2 = AlmanacParser.getMinimumLocationFromSeeds(almanac);
    console.log('Lowest location number when seeds are parsed as a range: ', resultPart2);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}
