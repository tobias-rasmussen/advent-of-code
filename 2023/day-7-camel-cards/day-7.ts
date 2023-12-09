import { Hand } from "./hand";

import * as fs from 'fs';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const words = fs.readFileSync('./day-7-camel-cards/day-7-input.txt', 'utf-8');
    const hands = words.split('\r\n');
    const resultPart1 = totalWinnings(hands);
    console.log('Total winnings of given hands: ', resultPart1);

    const resultPart2 = totalWinnings(hands, true);
    console.log('Total winnings of given hands, counting jokers: ', resultPart2);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}

export function totalWinnings(input: string[], countJokers = false): number {
    const hands: Hand[] = input.map((hand) => new Hand(hand));
    hands.sort((a,b) => Hand.compareHands(a, b, countJokers));
    let totalWinnings = 0;
    for (let i = 0; i < input.length; i++) {
        totalWinnings += hands[i].bid * (i + 1);
    }
    return totalWinnings;
}