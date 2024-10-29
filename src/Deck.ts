import { Card } from './Card';
import { Figure } from './Figure';
import { Suit } from './Suit';

export class Deck {
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

    public deal(): { player1Game: Card[]; player2Game: Card[] } {
        // Create two arrays to store the cards for each player
        const player1Game: Card[] = [];
        const player2Game: Card[] = [];

        // Go through all the cards in the deck
        this.cards.forEach((card, index) => {
            // If the index is even, add the card to player 1's game otherwise add it to player 2's game
            if (index % 2 === 0) {
                player1Game.push(card);
            } else {
                player2Game.push(card);
            }
        });
        // Return the two arrays
        return { player1Game, player2Game };
    }
    
}