import { readDistancesToBeat, readDurations } from "./inputParser";

describe('Parses race durations', () => {
    it.each([
        ['Time:      7', [7]],
        ['Time:      7  15', [7, 15]],
        ['Time:      7  15   30', [7, 15, 30]],
    ])('Parses input %s to %s', (input, expected) => {
        expect(readDurations(input)).toStrictEqual(expected);
    });
});

describe('Parses race records', () => {
    it.each([
        ['Distance:  9', [9]],
        ['Distance:  9  40', [9, 40]],
        ['Distance:  9  40  200', [9, 40, 200]],
    ])('Parses input %s to %s', (input, expected) => {
        expect(readDistancesToBeat(input)).toStrictEqual(expected);
    });
});