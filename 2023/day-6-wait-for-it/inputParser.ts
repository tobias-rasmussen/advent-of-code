export function readDurations(input: string): number[] {
    // Time:      7  15   30
    return input.split(':')[1].split(' ').filter((x) => x != '').map((x) => parseInt(x));
}

export function readDistancesToBeat(input: string): number[] {
    // Distance:  9  40  200
    return input.split(':')[1].split(' ').filter((x) => x != '').map((x) => parseInt(x));
}