import { Game } from "./game";
import { Constraint } from "./constraint";
import { sumOfPossibleGameIds, sumOfPowersOfMinimumPossibleGames } from "./day-2";

describe('Day 2 - Part 1', () => {

    describe("Can tell if game is possible", () => {
        it.each([
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', true],
            ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', true],
            ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', false],
            ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', false],
            ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', true],
        ])('Game %s is possible: %s', (input, expected) => {
            const game = new Game(input);
            const constraint: Constraint = {blueDie: 14, greenDie: 13, redDie: 12};

            const result = game.isPossible(constraint);
            
            expect(result).toBe(expected);
        });
    });

    describe("Provides game ID", () => {
        it.each([
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 1],
            ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', 2],
            ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 3],
            ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', 4],
            ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', 5],
            ['Game 21: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', 21],
            ['Game 100: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', 100],
        ])('Game %s has ID %s', (input, expected) => {
            const game = new Game(input);

            const result = game.id;
            
            expect(result).toBe(expected);
        });
    });

    describe("Calculates sum of possible game IDs", () => {
        it.each([
            [['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'], 1 + 2],
            [['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'], 5],
        ])('Games %s has sum %s', (listOfGameInputs, expected) => {
            const constraint: Constraint = {blueDie: 14, greenDie: 13, redDie: 12};

            const result = sumOfPossibleGameIds(listOfGameInputs, constraint);
            
            expect(result).toBe(expected);
        });
    });
});

describe('Day 2 - Part 2', () => {

    describe("Can provide the fewest number of die in each color", () => {
        it.each([
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', {red: 4, green: 2, blue: 6}],
            ['Game 3: 8 green, 7 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', {red: 20, green: 13, blue: 7}],
        ])('Game %s has fewest possible dice: %s', (input, expected) => {
            const game = new Game(input);

            const result = game.getFewestPossibleDice();
            
            expect(result).toStrictEqual(expected);
        });
    });

    describe("Can provide the power of the minimum set of dice", () => {
        it.each([
            ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 48],
            ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 1560],
        ])('Game %s has power of the minimum set of dice: %s', (input, expected) => {
            const game = new Game(input);

            const result = game.getPowerOfMinimumNumberOfDice();
            
            expect(result).toStrictEqual(expected);
        });
    });

    describe("Can provide the power of the minimum set of dice", () => {
        it.each([
            [['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'], 48 + 12],
            [['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'], 1560 + 630 + 36],
        ])('Games %s have total sum of powers of minimum possible games %s', (listOfGameInputs, expected) => {
            const result = sumOfPowersOfMinimumPossibleGames(listOfGameInputs);
            
            expect(result).toBe(expected);
        });
    });
});

