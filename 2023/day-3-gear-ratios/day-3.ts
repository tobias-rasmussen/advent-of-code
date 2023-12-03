import * as fs from 'fs';
import { SchematicParser } from './schematic-parser';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const input = fs.readFileSync('./day-3-input.txt', 'utf-8');
    const schematics = input.split('\r\n');
    const resultPart1 = SchematicParser.sumPartNumbers(schematics);
    console.log('Sum of all number parts with adjecent symbols: ', resultPart1);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}
