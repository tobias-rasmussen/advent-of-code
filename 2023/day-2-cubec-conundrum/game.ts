import { Constraint } from './constraint';
export class Game {
    public readonly id: number;

    private blueDie: Array<number>;
    private greenDie: Array<number>;
    private redDie: Array<number>;  

    constructor(gameInput: string) {
        this.blueDie = new Array<number>();
        this.greenDie = new Array<number>();
        this.redDie = new Array<number>();

        const idInput = gameInput.split(':')[0]; 
        this.id = parseInt(idInput.split('Game ')[1]);

        const diceInput = gameInput.split(':')[1];
        const sequences = diceInput.split(';');

        sequences.forEach(sequence => {
            let red = 0, green = 0, blue = 0;
            const colors = sequence.split(',');
            colors.forEach(color => {
                if (color.includes('red')) red = parseInt(color.split('red')[0]);
                if (color.includes('blue')) blue = parseInt(color.split('blue')[0]);
                if (color.includes('green')) green = parseInt(color.split('green')[0]);
            });
            this.redDie.push(red);
            this.greenDie.push(green);
            this.blueDie.push(blue);
        });
    }

    public isPossible(constraint: Constraint): boolean {
        return constraint.blueDie >= Math.max(...this.blueDie) 
        && constraint.greenDie >= Math.max(...this.greenDie)
        && constraint.redDie >= Math.max(...this.redDie)
    }
}