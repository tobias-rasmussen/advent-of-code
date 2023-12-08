export class Race {
    private raceDuration: number;

    constructor(raceDuration: number) {
        this.raceDuration = raceDuration;
    }

    public distanceTravelled(durationHeld: number): number {
        if (durationHeld > this.raceDuration) return 0;
        return (this.raceDuration - durationHeld) * durationHeld;
    }

    public waysToBeat(toBeat: number): number {
        let result = 0;

        for (let i = 1; i <= this.raceDuration; i++) {
            if (this.distanceTravelled(i) > toBeat) result++;
        }

        return result;
    }
}