import { totalWinnings } from "./day-7";

describe('Total winnings', () => {
    it.each([
        [['TTTTT 765'], 765],
        [['KJQ72 87623'], 87623],
        [['TTA23 1'], 1],
    ])('Total winnings of a single hand is its bid', (input: string[], expected) => {      
        const result = totalWinnings(input);

        expect(result).toBe(expected);
    });

    it.each([
        [['32T3K 765', 'KK677 28', 'KTJJT 220'], 765 * 1 + 28 * 3 + 220 * 2],
        [['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483'], 765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5]
    ])('Multiplies bid according to hand rank', (input: string[], expected) => {      
        const result = totalWinnings(input);

        expect(result).toBe(expected);
    });

    it('Multiplies bid according to hand rank, counting jokers', () => {      
        const input = ['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483']
        
        const result = totalWinnings(input, true);

        expect(result).toBe(5905);
    });
});