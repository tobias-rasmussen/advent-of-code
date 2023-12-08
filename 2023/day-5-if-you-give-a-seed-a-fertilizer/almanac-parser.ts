export class AlmanacParser {
    private static MAPPING_TYPES: string[] = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']; 

    public static mapSeedsToLocations(seeds: number[], almanac: string[]): number[] {        
        let result = seeds;
        this.MAPPING_TYPES.forEach(mappingType => {
            result = this.transform(result, mappingType, almanac);
        });
        return result;
    }

    public static getMinimumLocationFromRangeOfSeeds(seeds: number[], almanac: string[]): number {
        let result: number[] = [];
        for (let i = 0; i < seeds.length; i += 2) {
            let range = [seeds[i], seeds[i+1]];
            this.MAPPING_TYPES.forEach(mappingType => {
                const mappings = this.extractMapping(mappingType, almanac);
                range = this.transformRange(range, mappings);
            });
            result.push(...range);
        }
        return result[0];
    }

    public static parseSeeds(seedsLine: string): number[] {
        return seedsLine.split(':')[1].trim().split(' ').map((x) => parseInt(x));
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

    public static transformRange(input: number[], mappings: number[][]): number[] {
        const result: number[] = [];

        for (let i = 0; i < input.length; i += 2) {
            const element = input[i];
            const range = input[i+1];
            let mappingFound = false;
            for (let j = 0; j < mappings.length; j++) {
                let mapping = mappings[j];
                const mapDest = mappings[j][0];
                const mapSrc = mappings[j][1];
                const mapRange = mappings[j][2];
                if (element + range - 1 < mapSrc || mapSrc + mapRange <= element) {
                    continue;
                }

                // If the range is wholy contained in the mapping
                if (mapSrc <= element 
                    && element <= mapSrc + mapRange - 1
                    && element + range <= mapSrc + mapRange) {
                    mappingFound = true;
                    result.push(mapDest + element - mapSrc);
                    result.push(range);
                    break;
                }
                // If range intersects with map from the left
                if (element + range > mapSrc + mapRange) {
                    const newRange = [element,  mapRange - range, element + mapRange - range, range - (mapRange - range)];
                    result.push(...this.transformRange(newRange, [mapping]));
                    mappingFound = true;
                    break;
                }
                // If range intersects with map from the right
                if (mapSrc < element + range) {
                    const newRange = [element, mapRange - range, mapSrc, range - (mapRange - range)];
                    result.push(...this.transformRange(newRange, [mapping]));
                    mappingFound = true;
                    break;
                }
            };
            if (!mappingFound) {
                result.push(element);
                result.push(range);
            }
        }
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