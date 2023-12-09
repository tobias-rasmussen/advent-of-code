import { Hand } from "./hand";

describe('It can determine the strength of a hand', () => {
    it('High card hand %s has strength 0', () => {
        const input = '32TAK 765';

        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(0);
    });
    
    it.each([
        ['32TAA 765'],
    ])('1 pair hand %s has strength 1', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(1);
    });

    it.each([
        ['322AA 765'],
    ])('2 pair hand %s has strength 2', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(2);
    });

    it.each([
        ['32AAA 765'],
    ])('3 of a kind hand %s has strength 3', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(3);
    });

    it.each([
        ['33AAA 765'],
    ])('full house hand %s has strength 4', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(4);
    });

    it.each([
        ['3AAAA 765'],
    ])('Four of a kind %s has strength 5', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(5);
    });

    it.each([
        ['AAAAA 765'],
    ])('Five of a kind %s has strength 6', (input: string) => {
        const hand = new Hand(input);
        
        expect(hand.getStrength()).toBe(6);
    });
});

describe('Comparing by strength', () => {
    it.each([
        ['AAAAA 765', 'AAAAA 765', 0],
        ['AAAAA 765', 'AKKKK 765', 1],
        ['AAAAA 765', 'AAKKK 765', 1],
        ['AAAAA 765', 'AAKKT 765', 1],
        ['AAAAA 765', 'AAKQJ 765', 1],
        ['AAAAA 765', 'AKQJT 765', 1],
    ])('Comparing five of a kind hand %s to %s', (input1: string, input2: string, expected) => {
        const result = Hand.compareHands(new Hand(input1), new Hand(input2));

        expect(result).toBe(expected);
    });

    it.each([
        ['AKKKK 765', 'AAAAA 765', -1],
        ['AKKKK 765', 'AKKKK 765', 0],
        ['AKKKK 765', 'AAKKK 765', 1],
        ['AKKKK 765', 'AAKKT 765', 1],
        ['AKKKK 765', 'AAKQJ 765', 1],
        ['AKKKK 765', 'AKQJT 765', 1],
    ])('Compares four of a kind hand %s and hand %s', (input1: string, input2: string, expected) => {
        const result = Hand.compareHands(new Hand(input1), new Hand(input2));

        expect(result).toBe(expected);
    });
});

describe('Comparison by card value', () => {
    it.each([
        ['TTTTT 765', 'TTTTT 765', 0],
        ['22222 765', '33333 765', -1],
        ['KAAAA 765', 'AKKKK 765', -1],
    ])('Compares hand %s and hand %s by card value', (input1: string, input2: string, expected) => {
        const result = Hand.compareHands(new Hand(input1), new Hand(input2));

        expect(result).toBe(expected);
    });

    it.each([
        ['KTJJT 765', 'QQQJA 765', 1],
        ['KTJJT 765', 'T55J5 765', 1],
        ['QQQJA 765', 'T55J5 765', 1],
        ['2QQQJ 765', 'JQQQA 765', 1], // Joker has lowest value of all
    ])('Compares hand %s and hand %s by card value, counting jokers', (input1: string, input2: string, expected) => {
        const result = Hand.compareHands(new Hand(input1), new Hand(input2), true);

        expect(result).toBe(expected);
    });
});

describe('With Jokers', () => {
    it.each([
        ['T5555 765', 5],
        ['T55J5 765', 5],
        ['TJ5J5 765', 5],
        ['J2T3K 100', 1],
        ['JJJJJ 765', 6],
        ['2233J 765', 4],
    ])('Calculates strength of hand with jokers', (input: string, expected) => {
        const hand = new Hand(input);

        const result = hand.getStrength(true);

        expect(result).toBe(expected);
    });
});