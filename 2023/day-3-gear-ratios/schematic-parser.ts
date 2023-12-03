export class SchematicParser {    
    static sumPartNumbers(schematic: string[]): number {
        let result = 0;

        for (let i = 0; i < schematic.length; i++)
            for (let j = 0; j < schematic[0].length; j++) {
                if (!isDigit(schematic[i].charAt(j))) continue;
                // i,j is the leftmost position of a new number
                const partNumber = extractNumberToTheRight(i, j);
                const adjecentSymbol = hasAdjecentSymbol(i, j, partNumber.length);
                if (adjecentSymbol) {
                    result += parseInt(partNumber);
                }
                j += partNumber.length; // Skip the rest of the same number
        }
        
        return result;

        function isDigit(s: string): boolean {
            return !!s.match(/[0-9]/);
        }
        
        function extractNumberToTheRight(i: number, j: number): string {
            let partNumber = schematic[i].charAt(j);
            let k = 0;
            while (isDigit(schematic[i].charAt(j + 1 + k))) {
                partNumber += schematic[i].charAt(j + 1 + k);
                k++;
            }
            return partNumber;
        }

        function hasAdjecentSymbol(i: number, j: number, n: number): boolean {
            // Check to the left of the number
            if (j > 0 ) {
                if (isSymbol(i, j - 1)) return true;
                if (i > 0 && isSymbol(i - 1, j - 1)) return true;
                if (i + 1 < schematic.length && isSymbol(i + 1, j - 1)) return true;
            }
            // Check directly above each digit
            if (i > 0) {
                for (let k = 0; k < n; k++) {
                    if (isSymbol(i - 1, j + k)) return true;
                }
            }
            // Check directly below each digit
            if (i + 1 < schematic.length) {
                for (let k = 0; k < n; k++) {
                    if (isSymbol(i + 1, j + k)) return true;
                }
            }
            // Check to the right of the number
            if (j + n < schematic[i].length ) {
                if (isSymbol(i, j + n)) return true;
                if (i > 0 && isSymbol(i - 1, j + n)) return true;
                if (i + 1 < schematic.length && isSymbol(i + 1, j + n)) return true;
            }
            return false;
        }

        function isSymbol(i: number, j: number): boolean {
            return !!schematic[i].charAt(j).match(/[^0-9\.]/);
        }
    }
}
