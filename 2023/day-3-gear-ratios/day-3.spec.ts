import { SchematicParser } from "./schematic-parser";

describe('Day 3 - Part 1', () => {

    it('Should not count numbers with no adjecent symbols', () => {
        const engineSchematic: string[] = [
            '467..114.*',
            '..........',
            '%.35..633.'
        ];

        const actual = SchematicParser.sumPartNumbers(engineSchematic);

        expect(actual).toBe(0);
    });

    it('Should sum numbers with symbols to the left', () => {
        const engineSchematic: string[] = [
            '467..*114.',
            '..........',
            '.%35..633.'
        ];

        const actual = SchematicParser.sumPartNumbers(engineSchematic);

        expect(actual).toBe(114 + 35);
    });

    it('Should sum numbers with symbols to the right', () => {
        const engineSchematic: string[] = [
            '467...115+',
            '....633+..',
            '.35.......'
        ];

        const actual = SchematicParser.sumPartNumbers(engineSchematic);

        expect(actual).toBe(115 + 633);
    });

    it('Should only count a number once', () => {
        const engineSchematic: string[] = [
            '...+++++..',
            '...+123+..',
            '...+++++..'
        ];

        const actual = SchematicParser.sumPartNumbers(engineSchematic);

        expect(actual).toBe(123);
    });
});