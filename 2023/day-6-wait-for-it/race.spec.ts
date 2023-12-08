import { Race } from "./race";


describe('Calculating distance travelled', () => {
    it('Holding button for 0 milliseconds travels 0 millimeters', () => {
        const race = new Race(10);
        
        const result = race.distanceTravelled(0);

        expect(result).toBe(0);
    });

    it('Holding button for 1 milliseconds travels 9 millimeters', () => {
        const race = new Race(10);
        
        const result = race.distanceTravelled(1);

        expect(result).toBe(9);
    });

    it('Holding button for 2 milliseconds travels 10 millimeters', () => {
        const race = new Race(7);
        
        const result = race.distanceTravelled(2);

        expect(result).toBe(10);
    });

    it('Holding button for 3 milliseconds travels 12 millimeters', () => {
        const race = new Race(7);
        
        const result = race.distanceTravelled(3);

        expect(result).toBe(12);
    });

    it('Holding button for longer than the race lasts moves 0 millimeters', () => {
        const race = new Race(7);
        
        const result = race.distanceTravelled(8);

        expect(result).toBe(0);
    });
});

describe('Calculate number of ways to win a race', () => {
    it('Returns 0 numbers to win on impossible race', () => {
        const race = new Race(1);

        const result = race.waysToBeat(1000);

        expect(result).toBe(0);
    });

    it('Returns 1 on barely winnable race', () => {
        const race = new Race(2);

        const result = race.waysToBeat(0);

        expect(result).toBe(1);
    });

    it('Returns 2 for race with 2 winning options', () => {
        const race = new Race(3);

        const result = race.waysToBeat(1);

        expect(result).toBe(2);
    });
});