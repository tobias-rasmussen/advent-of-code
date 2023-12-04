export class SchematicParser {    
    static sumPartNumbers(schematic: string[]): number {
        let result = 0;

        for (let i = 0; i < schematic.length; i++)
            for (let j = 0; j < schematic[0].length; j++) {
                if (!SchematicParser.isDigit(schematic[i].charAt(j))) continue;
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

    static sumGearRatios(schematic: string[]): number {
        let result = 0;

        for (let i = 0; i < schematic.length; i++)
            for (let j = 0; j < schematic[0].length; j++) {
                if (!isStar(schematic[i].charAt(j))) continue;
                const partNumbers = extractAdjacentPartNumbers(i,j);
                if (partNumbers.length == 2) {
                    result += partNumbers[0] * partNumbers[1];
                }
        }
        
        return result;

        function isStar(s: string): boolean {
            return !!s.match(/[*]/);
        }

        function extractAdjacentPartNumbers(i: number, j: number): number[] {
            const result: Array<number> = new Array();

            // Check if there is a number to the right
            if (j + 1 < schematic[i].length && SchematicParser.isDigit(schematic[i].charAt(j + 1))) {
                result.push(extractNumber(i, j + 1))
            }
            // Check if there is a number to the left
            if (j > 0 && SchematicParser.isDigit(schematic[i].charAt(j - 1))) {
                result.push(extractNumber(i, j - 1));
            }
            // Check for numbers above
            if (i > 0 ) {
                extractNumbersFromRowAboveOrBelow(i - 1);
            }
            // Check for numbers below
            if (i + 1 < schematic.length) {
                extractNumbersFromRowAboveOrBelow(i + 1);
            }
            return [...result];

            function extractNumbersFromRowAboveOrBelow(k: number) {
                if (SchematicParser.isDigit(schematic[k].charAt(j))) {
                    // It is enough to only check here and not at j+1 and j-1
                    result.push(extractNumber(k, j));
                } else {
                    if (j + 1 < schematic[k].length && SchematicParser.isDigit(schematic[k].charAt(j + 1))) {
                        // It is enough to only check here and not at j+1 and j-1
                        result.push(extractNumber(k, j + 1));
                    }
                    if (j > 0 && SchematicParser.isDigit(schematic[k].charAt(j - 1))) {
                        // It is enough to only check here and not at j+1 and j-1
                        result.push(extractNumber(k, j - 1));
                    }
                }
            }
        }

        function extractNumber(i: number, j: number): number {
            let result = "";
            
            // Go as far left as possible
            let k = 0;
            while (SchematicParser.isDigit(schematic[i].charAt(j - 1 - k))) {
                k++;
            }
            // Now go to the right, picking up digits until we reach a non-digit
            while (SchematicParser.isDigit(schematic[i].charAt(j - k))) {
                result += schematic[i].charAt(j - k);
                k--;
            }

            return parseInt(result);
        }
    }

    private static isDigit(s: string): boolean {
        return !!s.match(/[0-9]/);
    }
}
