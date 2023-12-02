import { getCalibrationValue, getTotalCalibrationValue, getModifiedCalibrationValue, getTotalModifiedCalibrationValue } from './day-1';

describe('Day 1 - Part 1', () => {
    describe("Get calibration value", () => {
        it.each([
            ['1abc2', 12],
            ['pqr3stu8vwx', 38],
            ['a1b2c3d4e5f', 15],
            ['treb7uchet', 77]
        ])('Input %s has calibration value %s', (input, expected) => {
            const result = getCalibrationValue(input);
            expect(result).toBe(expected);
        });
    });

    describe("Summarize calibration values", () => {
        it.each([
            [['1abc2', 'pqr3stu8vwx'], 12 + 38],
            [['a1b2c3d4e5f', 'treb7uchet'], 15 + 77],
        ])('Input %s has total calibration value %s', (input, expected) => {
            const result = getTotalCalibrationValue(input);
            expect(result).toBe(expected);
        });
    });
});

describe('Day 1 - Part 2', () => {
    describe("Get modified calibration value", () => {
        it.each([
            ['1abc2', 12],
            ['pqr3stu8vwx', 38],
            ['a1b2c3d4e5f', 15],
            ['treb7uchet', 77]
        ])('Should not regress from initial version', (input, expected) => {
            const result = getModifiedCalibrationValue(input);
            expect(result).toBe(expected);
        });

        it.each([
            ['two1nine', 29],
            ['eightwothree', 83],
            ['abcone2threexyz', 13],
            ['xtwone3four', 24],
            ['4nineeightseven2', 42],
            ['zoneight234', 14],
            ['7pqrstsixteen', 76],
            ['eighthree', 83], // Thanks to David Whitney for pointing out this case edge case
        ])('Input %s has modified calibration value %s', (input, expected) => {
            const result = getModifiedCalibrationValue(input);
            expect(result).toBe(expected);
        });
    });

    describe("Summarizes modified calibration values", () => {
        it.each([
            [['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four'], 29 + 83 + 13 + 24],
            [['xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen', 'eighthree'], 24 + 42 + 14 + 76 + 83],
        ])('Input %s has total calibration value %s', (input, expected) => {
            const result = getTotalModifiedCalibrationValue(input);
            expect(result).toBe(expected);
        });
    });
});