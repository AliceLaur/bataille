import { Card } from './Card';
import { Figure } from './Figure';
import { Suit } from './Suit';

export class Deck {
    protected id: number;
    protected Cards: Card[] = [];
    public firstHalf: Card[] = [];
    public secondHalf: Card[] = [];

    constructor(id: number, cards: Card[]) {
        this.id = id;
        this.Cards = cards;
    }

    public addCard(card: Card): void {
        this.Cards.push(card);
    }

    public getCards(): Card[] {
        return this.Cards;
    }

    public createDeck(): void {
        const suits = Object.values(Suit) as Suit[]
        const figures = Object.values(Figure) as Figure[]
        // Go trough all the suits
        for (let i = 0; i < 4; i++) {
            // Go through all the figures
            for (let j = 0; j < 13; j++) {
                // Create a new card and add it to the deck
                this.addCard(new Card(j + 2, suits[i], figures[j]));
            }
        }
    }

    public separateDeck(): void {
        // Shuffle the deck of cards
        const shuffledDeck = this.Cards.sort(() => Math.random() - 0.5);
        // Split the deck in half
        const half = Math.ceil(shuffledDeck.length / 2);
        this.firstHalf = shuffledDeck.splice(0, half);
        this.secondHalf = shuffledDeck.splice(-half);
    }

    public displayDeck(): void {
        this.Cards.forEach(card => {
            console.log(card.display());
        });
    }

    public displayFirstHalf(): void {
        this.firstHalf.forEach(card => {
            console.log("First half",card.display());
        });
    }

    public displaySecondHalf(): void {
        this.secondHalf.forEach(card => {
            console.log("Second half",card.display());
        });
    }
}