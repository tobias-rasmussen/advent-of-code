import * as fs from 'fs';
import { ScratchCardParser } from './scratch-card-parser';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const input = fs.readFileSync('./day-4-scratchcards/day-4-input.txt', 'utf-8');
    const cards = input.split('\r\n');
    const resultPart1 = ScratchCardParser.pointsForCards(cards);
    console.log('Sum of all number parts with adjecent symbols: ', resultPart1);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}
