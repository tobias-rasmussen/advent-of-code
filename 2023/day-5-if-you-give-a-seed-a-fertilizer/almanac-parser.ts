export class AlmanacParser {
    private static MAPPING_TYPES: string[] = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']; 

    public static mapSeedsToLocations(seeds: number[], almanac: string[]): number[] {        
        let result = seeds;
        this.MAPPING_TYPES.forEach(mappingType => {
            result = this.transform(result, mappingType, almanac);
        });
        return result;
    }

    public static getMinimumLocationFromSeeds(almanac: string[]): number {
        let result = Infinity;
        const seedsAsNumbers = AlmanacParser.parseSeedsAsNumbers(almanac[0]);

        for (let i = 1; i < seedsAsNumbers.length; i += 2) {
            let seeds = [];
            for (let k = 0; k < seedsAsNumbers[i]; k++) {
                seeds.push(seedsAsNumbers[i - 1] + k);
                if (seeds.length == 100000) {
                    const location: number = Math.min(...this.mapSeedsToLocations(seeds, almanac));
                    seeds = [];
                    console.log('i: %d, k: %d, location: %d, result: %d', i, k, location, result);
                    if (location < result) result = location;
                }
            }
            const location: number = Math.min(...this.mapSeedsToLocations(seeds, almanac));
            if (location < result) result = location;
        }
        return result;
    }

    public static parseSeedsAsNumbers(seedsLine: string): number[] {
        return seedsLine.split(':')[1].trim().split(' ').map((x) => parseInt(x));
    }

    public static parseSeedsAsRange(seedsLine: string): number[] {
        const numbers = seedsLine.split(':')[1].trim().split(' ').map((x) => parseInt(x));
        let result: number[] = [];
        for (let i = 1; i < numbers.length; i += 2) {
            for (let k = 0; k < numbers[i]; k++) {
                result.push(numbers[i - 1] + k);
            }
        }
        return result;
    }

    public static transform(input: number[], mappingType: string, almanac: string[]): number[] {
        const mappings: number[][] = this.extractMapping(mappingType, almanac);
        const result: number[] = [];

        input.forEach(element => {
            let mappingFound = false;
            mappings.forEach(mapping => {
                if (mapping[1] <= element && element <= mapping[1] + mapping[2] - 1) {
                    result.push(element + mapping[0] - mapping[1]);
                    mappingFound = true;
                }
            });
            if (!mappingFound) result.push(element);
        });

        return result;
    }

    private static extractMapping(mappingType: string, almanac: string[]): number[][] {
        const result: number[][] = [];
        let isParsing = false;
        for(let i = 1; i < almanac.length; i++) {
            if (almanac[i].startsWith(mappingType)) isParsing = true;
            if (almanac[i] == '' && isParsing) break;
            if (isParsing) {
                result.push(almanac[i].split(' ').map((x) => parseInt(x)));
            }
        }
        return result;
    }
}