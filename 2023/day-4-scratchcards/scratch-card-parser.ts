export class ScratchCardParser {

    public static pointsForCards(cards: string[]): number {
        let result = 0;
        cards.forEach(card => {
            result += this.pointsForCard(card);
        });
        return result;
    }

    public static pointsForCard(card: string): number {
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

        if (matchingWinners == 0) return 0;
        return Math.pow(2, matchingWinners - 1);
    }
}