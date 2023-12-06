import { AlmanacParser } from "./almanac-parser";

describe('Day 5 - Part 1', () => {
    it('Should return seed number when no special mapping rules apply', () => {
        const almanac = [
        'seeds: 0 1 2 3 4',
        '',
        'seed-to-soil map:',
        '50 98 2',
        '',
        'soil-to-fertilizer map:',
        '5 15 37',
        '',
        'fertilizer-to-water map:',
        '49 53 8',
        '',
        'water-to-light map:',
        '88 18 7',
        '',
        'light-to-temperature map:',
        '45 77 23',
        '',
        'temperature-to-humidity map:',
        '5 69 1',
        '',
        'humidity-to-location map:',
        '60 56 37',
        ''
    ];

        const result = AlmanacParser.mapSeedsToLocations(almanac);

        expect(result).toStrictEqual([0, 1, 2, 3, 4]);
    });

    it('Should return soil mappings when these are the only matches', () => {
        const almanac = [
        'seeds: 0 1 2 3 4',
        '',
        'seed-to-soil map:',
        '100 0 5',
        '',
        'soil-to-fertilizer map:',
        '0 15 37',
        '37 52 2',
        '39 0 15',
        '',
        'fertilizer-to-water map:',
        '49 53 8',
        '0 11 42',
        '42 0 7',
        '57 7 4',
        '',
        'water-to-light map:',
        '88 18 7',
        '18 10 70',
        '',
        'light-to-temperature map:',
        '45 71 23',
        '81 45 19',
        '68 64 13',
        '',
        'temperature-to-humidity map:',
        '0 69 1',
        '1 0 69',
        '',
        'humidity-to-location map:',
        '60 56 37',
        '56 93 4'];

        const result = AlmanacParser.mapSeedsToLocations(almanac);

        expect(result).toStrictEqual([100, 101, 102, 103, 104]);
    });

    it('Satisfies puzzle example input', () => {
        const input = ['seeds: 79 14 55 13',
        '',
        'seed-to-soil map:',
        '50 98 2',
        '52 50 48',
        '',
        'soil-to-fertilizer map:',
        '0 15 37',
        '37 52 2',
        '39 0 15',
        '',
        'fertilizer-to-water map:',
        '49 53 8',
        '0 11 42',
        '42 0 7',
        '57 7 4',
        '',
        'water-to-light map:',
        '88 18 7',
        '18 25 70',
        '',
        'light-to-temperature map:',
        '45 77 23',
        '81 45 19',
        '68 64 13',
        '',
        'temperature-to-humidity map:',
        '0 69 1',
        '1 0 69',
        '',
        'humidity-to-location map:',
        '60 56 37',
        '56 93 4'];

        const result = AlmanacParser.mapSeedsToLocations(input);

        expect(result).toStrictEqual([82, 43, 86, 35]);
    });
});