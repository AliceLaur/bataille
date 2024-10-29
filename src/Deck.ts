import { Card } from './Card';
import { Figure } from './Figure';
import { Suit } from './Suit';

export class Deck {
    deal(): { player1Game: any; player2Game: any; } {
        throw new Error('Method not implemented.');
    }
    private cards: Card[];

    constructor(cards?: Card[]) {
        this.cards = cards || [];
        this.createDeck();
    }

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public createDeck(): void {
        // Get all the suits and figures as arrays
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
        this.cards.sort(() => Math.random() - 0.5);
    }

    public displayDeck(): void {
        this.cards.forEach(card => {
            console.log(card.display());
        });
    }
    
}