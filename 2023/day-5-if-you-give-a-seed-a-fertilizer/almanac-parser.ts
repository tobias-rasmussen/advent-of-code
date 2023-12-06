export class AlmanacParser {
    public static mapSeedsToLocations(almanac: string[]): number[] {
        let currentSeedList: number[] = almanac[0].split(':')[1].trim().split(' ').map((x) => parseInt(x));
        let nextSeedList: number[] = [];
        console.log('Init method with seeds: ', currentSeedList);
        for (let i = 3; i < almanac.length; i++) {
            if (i == 4) console.log('i:%d, almanac[%d]: %s',i,i, almanac[i])
            if (almanac[i].match(/[0-9]/g)) {
                const mapping: number[] = almanac[i].split(' ').map((x) => parseInt(x));
                if (i == 4) console.log('i:%d, mapping: %s',i, mapping);
                currentSeedList.forEach(seed => {
                    if (i == 4) console.log('i:%d, %d <= %d && %d <= %d',i, mapping[1], seed, seed, mapping[1] + mapping[2] - 1);
                    if (mapping[1] <= seed && seed <= mapping[1] + mapping[2] - 1) {
                        console.log('i:%d, Mapping %d to %d based on mapping',i, seed, seed + mapping[0] - mapping[1], mapping);
                        nextSeedList.push(seed + mapping[0] - mapping[1]);
                        currentSeedList = currentSeedList.filter((x) => x != seed);
                    }
                });
            }
            if (almanac[i] === '' || i == almanac.length - 1) {
                let element = currentSeedList.pop();
                while(element != undefined) {
                    nextSeedList.push(element);
                    element = currentSeedList.pop();
                }
            }
            const _ = currentSeedList;
            currentSeedList = nextSeedList;
            nextSeedList = _;
        }

        return currentSeedList;
    }
}