import { Card } from './Card';
import { Figure } from './Figure';
import { Suit } from './Suit';

export class Deck {
    private cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public createDeck(): void {
        const suits = Object.values(Suit) as Suit[]
        const figures = Object.values(Figure) as Figure[]
        // Go trough all the suits
        for (let i = 0; i < suits.length; i++) {
            // Go through all the figures
            for (let j = 0; j < figures.length; j++) {
                // Create a new card and add it to the deck
                this.cards.push(new Card(j + 2, suits[i], figures[j]));
            }
        }
    }

    public shuffleDeck(): void {
        const shuffledDeck = this.cards.sort(() => Math.random() - 0.5);
    }

    // public separateDeck(): void {
    //     // Shuffle the deck of cards
    //     const shuffledDeck = this.Cards.sort(() => Math.random() - 0.5);
    //     // Split the deck in half
    //     const half = Math.ceil(shuffledDeck.length / 2);
    //     this.firstHalf = shuffledDeck.splice(0, half);
    //     this.secondHalf = shuffledDeck.splice(-half);
    // }

    public displayDeck(): void {
        this.cards.forEach(card => {
            console.log(card.display());
        });
    }

    // public displayFirstHalf(): void {
    //     this.firstHalf.forEach(card => {
    //         console.log("First half",card.display());
    //     });
    // }

    // public displaySecondHalf(): void {
    //     this.secondHalf.forEach(card => {
    //         console.log("Second half",card.display());
    //     });
    // }
}