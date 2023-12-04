import { ScratchCardParser } from "./scratch-card-parser";

describe('Day 4 - Part 1', () => {
    it('Cards with no winning numbers give 0 points', () => {
        const input = 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36';

        const points = ScratchCardParser.pointsForCard(input);

        expect(points).toBe(0);
    });

    it('One winning number gives 1 point', () => {
        const input = 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83';

        const points = ScratchCardParser.pointsForCard(input);

        expect(points).toBe(1);
    });

    it('Two winning number gives 2 points', () => {
        const input = 'Card 3:  1 21 53  7 44 | 69 82 63 72  6 21 14  1';

        const points = ScratchCardParser.pointsForCard(input);

        expect(points).toBe(2);
    });

    describe("Doubles number of points for each winning number above 1", () => {
        it.each([
            ['Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', 1],
            ['Card 5: 41 92 73 84 69 | 69 84 76 51 58  5 54 83', 2],
            ['Card 6: 41 92 73 84 69 | 69 84 73 51 58  5 54 83', 4],
            ['Card 7: 41 92 73 84 69 | 69 84 73 92 58  5 54 83', 8],
            ['Card 8: 41 92 73 84 69 | 69 84 73 92 41  5 54 83', 16],
        ])('%s gives %s points', (input, expected) => {
            const points = ScratchCardParser.pointsForCard(input);

            expect(points).toBe(expected);
        });
    });

    it('Calculates total number of points from cards', () => {
        const input = [
        'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', 
        'Card 5: 41 92 73 84 69 | 69 84 76 51 58  5 54 83', 
        'Card 6: 41 92 73 84 69 | 69 84 73 51 58  5 54 83', 
        'Card 7: 41 92 73 84 69 | 69 84 73 92 58  5 54 83', 
        'Card 8: 41 92 73 84 69 | 69 84 73 92 41  5 54 83'];

        const points = ScratchCardParser.pointsForCards(input);

        expect(points).toBe(1 + 2 + 4 + 8 + 16);
    });
});