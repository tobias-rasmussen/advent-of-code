import { productOfWaysToWin } from "./day-6";

describe('Calculates product of number of ways to win a series of races', () => {
    it.each([
        [['Time:      7', 'Distance:  9'], 4],
        [['Time:      7  15', 'Distance:  9  40'], 4 * 8],
        [['Time:      7  15   30', 'Distance:  9  40  200'], 4 * 8 * 9],
    ])('Input: %s has %s product of ways to win', (input, expected) => {
        expect(productOfWaysToWin(input)).toBe(expected);
    });
});