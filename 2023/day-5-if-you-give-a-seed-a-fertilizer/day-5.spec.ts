import { AlmanacParser } from "./almanac-parser";

describe('Day 5 - Part 1', () => {
    it('Doesnt transform when mapping does not apply', () => {
        const mappingType = 'seed-to-soil';
        const input = [1, 2, 3, 4];
        const almanac = ['seeds: 1 2 3 4', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        
        const result = AlmanacParser.transform(input, mappingType, almanac);
        
        expect(result).toStrictEqual(input);
    });

    it('Transforms seed-to-soil', () => {
        const mappingType = 'seed-to-soil';
        const input = [79, 14, 55, 13];
        const almanac = ['seeds: 79 14 55 13', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        
        const result = AlmanacParser.transform(input, mappingType, almanac);
        
        expect(result).toStrictEqual([81, 14, 57, 13]);
    });

    it('Can transform from seed to soil to fertilizer', () => {
        const mappingTypes = ['seed', 'soil'];
        const input = [79, 14, 55, 13];
        const almanac = ['seeds: 79 14 55 13', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        
        let result = input;
        mappingTypes.forEach(mappingType => {
            result = AlmanacParser.transform(result, mappingType, almanac);   
            console.log('Got result: ', result);
        });
        
        expect(result).toStrictEqual([81, 53, 57, 52]);
    });

    it('Can transform from seed to soil to locations', () => {
        const almanac = ['seeds: 79 14 55 13', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        const seeds = AlmanacParser.parseSeedsAsNumbers(almanac[0]);

        const result = AlmanacParser.mapSeedsToLocations(seeds, almanac); 
        
        expect(result).toStrictEqual([82, 43, 86, 35]);
    });
});

describe('Day 5 - Part 2', () => {
    it('Can extract seed list as is', () => {
        const seedsLine = 'seeds: 1 2 3 4';
        
        const result = AlmanacParser.parseSeedsAsNumbers(seedsLine);
        
        expect(result).toStrictEqual([1, 2, 3, 4]);
    });

    it('Can extract seed list interpreted as a range', () => {
        const seedsLine = 'seeds: 79 5 55 1';
        
        const result = AlmanacParser.parseSeedsAsRange(seedsLine);
        
        expect(result).toStrictEqual([79, 80, 81, 82, 83, 55]);
    });

    it('Can map seed to location when seed is parsed as list', () => {
        const almanac = ['seeds: 79 14 55 13', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        const seeds = AlmanacParser.parseSeedsAsRange(almanac[0]);
        
        const result = AlmanacParser.mapSeedsToLocations(seeds, almanac);

        expect(Math.min(...result)).toBe(46);
    });

    it('Can map seed to location when seed is parsed as list, one at a time in a more memory friendly manner', () => {
        const almanac = ['seeds: 79 14 55 13', '', 'seed-to-soil map:','50 98 2', '52 50 48', '', 'soil-to-fertilizer map:','0 15 37', '37 52 2','39 0 15','','fertilizer-to-water map:','49 53 8','0 11 42','42 0 7','57 7 4','','water-to-light map:','88 18 7', '18 25 70','','light-to-temperature map:','45 77 23', '81 45 19', '68 64 13','', 'temperature-to-humidity map:', '0 69 1','1 0 69', '','humidity-to-location map:','60 56 37','56 93 4'];
        const result = AlmanacParser.getMinimumLocationFromSeeds(almanac);

        expect(result).toBe(46);
    });
});