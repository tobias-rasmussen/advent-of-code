export class AlmanacParser {
    private static MAPPING_TYPES: string[] = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']; 

    public static mapSeedsToLocations(almanac: string[]): number[] {        
        let seeds: number[] = almanac[0].split(':')[1].trim().split(' ').map((x) => parseInt(x));
        let result = seeds;
        this.MAPPING_TYPES.forEach(mappingType => {
            result = this.transform(result, mappingType, almanac);
        });
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