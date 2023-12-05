export class ScratchCardParser {

    public static pointsForCards(cards: string[]): number {
        let result = 0;
        cards.forEach(card => {
            result += this.pointsForCard(card);
        });
        return result;
    }

    public static pointsForCard(card: string): number {
        let matchingWinners = ScratchCardParser.numberOfWinningNumbers(card)
        if (matchingWinners == 0) return 0;
        return Math.pow(2, matchingWinners - 1);
    }

    private static numberOfWinningNumbers(card: string): number {
        let matchingWinners = 0;
        
        let winningNumbers = card.split(':')[1].split('|')[0].trim().split(' ').filter((x) => x != '');
        const cardNumbers = card.split(':')[1].split('|')[1].trim().split(' ').filter((x) => x != '');;

        cardNumbers.forEach(number => {
            winningNumbers.forEach(winningNumber => {
                if (number == winningNumber) {
                    matchingWinners++;
                    winningNumbers = winningNumbers.filter((x) => x != winningNumber )
                }
            });   
        });
        return matchingWinners;
    };

    public static totalCardsScratched(cards: string[]): number {
        const totalCards = new Array<number>(cards.length).fill(1);
        for (let i = 0; i < cards.length; i++) {
            const winningNumbers = ScratchCardParser.numberOfWinningNumbers(cards[i]);
            for (let n = 1; n <= winningNumbers; n++) {
                totalCards[i + n] += totalCards[i];
            }
        }
        let result = 0;
        totalCards.forEach(element => {
            result += element;
        });
        return result;
    }
}