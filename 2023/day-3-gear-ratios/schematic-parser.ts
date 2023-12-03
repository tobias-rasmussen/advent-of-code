export class SchematicParser {    
    static sumPartNumbers(schematic: string[]): number {
        let result = 0;
        const summedNumbers = new Array<Pair>();

        for (let i = 0; i < schematic.length; i++)
            for (let j = 0; j < schematic[0].length; j++) {
                if (!isSymbol(schematic[i].charAt(j))) continue;
                if (hasDigitToTheRight(i, j)) result += extractNumberToTheRight(i, j);
                if (hasDigitToTheLeft(i,j)) result += extractNumberToTheLeft(i, j);
        }
        
        return result;

        function isSymbol(s: string): boolean {
            return !!s.match(/[^0-9\.]/);
        }

        function isDigit(s: string): boolean {
            return !!s.match(/[0-9]/);
        }

        function hasDigitToTheRight(i: number, j: number) {
            return j + 1 < schematic[0].length && isDigit(schematic[i].charAt(j + 1));
        }

        function hasDigitToTheLeft(i: number, j: number) {
            return j - 1 > 0 && isDigit(schematic[i].charAt(j - 1));
        }

        
        function extractNumberToTheRight(i: number, j: number) {
            let partNumber = schematic[i].charAt(j + 1);
            let k = 1;
            while (isDigit(schematic[i].charAt(j + 1 + k))) {
                partNumber += schematic[i].charAt(j + 1 + k);
                k++;
            }
            if (summedNumbers.includes(new Pair(i, j + k))) return 0;
            summedNumbers.push(new Pair(i, j + k))
            return parseInt(partNumber);
        }

        function extractNumberToTheLeft(i: number, j: number) {
            let partNumber = schematic[i].charAt(j - 1);
            let k = 1;
            while (isDigit(schematic[i].charAt(j - 1 - k))) {
                partNumber += schematic[i].charAt(j - 1 - k);
                k++;
            }
            if (summedNumbers.includes(new Pair(i, j - k))) return 0;
            summedNumbers.push(new Pair(i, j + k))
            // Reverse string
            const reversedPartNumber = partNumber.split("").reverse().join('');
            return parseInt(reversedPartNumber);
        }
    }
}

class Pair {
    i: number;
    j: number;

    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
    }
}