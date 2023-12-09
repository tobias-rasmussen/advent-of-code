export class Hand {
    public readonly bid: number;
    private static cardTypes = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    private static jokerCardTypes = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
    private readonly cards: string;

    constructor(input: string) {
        this.cards = input.split(' ')[0];
        this.bid = parseInt(input.split(' ')[1]);
    }

    public getStrength(countJokers = false) {
        const count = new Map<string, number>();
        let jokers = 0;
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            if (card == 'J') jokers++;
            if (count.has(card)) count.set(card, count.get(card)! + 1);
            else count.set(card, 1);
        }
        let maxOfAKind = 0;
        let pairs = 0;
        count.forEach((value, key) => {
            if (value == 2) pairs += 1;
            if (value > maxOfAKind) maxOfAKind = value;
        })
        if (countJokers) {
            maxOfAKind += jokers;
            if (maxOfAKind > 5) maxOfAKind = 5;
        }
        if (maxOfAKind > 3) return maxOfAKind + 1;
        if (maxOfAKind == 3) return pairs > 0 ? 4 : 3;
        if (maxOfAKind == 2) return pairs == 0 ? 1 : pairs;
        return 0;
    }

    public static compareHands(a: Hand, b: Hand, countJokers = false): number {
        if (a.getStrength(countJokers) > b.getStrength(countJokers)) return 1;
        if (b.getStrength(countJokers) > a.getStrength(countJokers)) return -1;
        const cardRules = countJokers ? Hand.jokerCardTypes : Hand.cardTypes;
        for (let i = 0; i < a.cards.length; i++) {
            const cardAValue = cardRules.findIndex((x) => x == a.cards[i]);
            const cardBValue = cardRules.findIndex((x) => x == b.cards[i]);
            if (cardAValue > cardBValue) return 1;
            if (cardBValue > cardAValue) return -1;
        }
        return 0;
    }
}