import { Player } from './Player';
import { Card } from './Card';
import { Deck } from './Deck';

export class Game {
    private player1: Player;
    private player2: Player;
    private round: number;
    private maxRound: number;
    private field: Card[];
    private warCount: number;
    
    
    constructor(player1Name: string, player2Name: string, maxRound: number, field: Card[] = [], warCount: number = 0) {
        const { player1Game, player2Game } = this.deal();
        this.player1 = new Player(player1Name, player1Game);
        this.player2 = new Player(player2Name, player2Game);
        this.round = 0;
        this.maxRound = maxRound;
        this.field = field;
        this.warCount = warCount;
    }

    private deal(): { player1Game: Card[]; player2Game: Card[] } {
        const deck = new Deck();
        deck.shuffleDeck();
        // Create two arrays to store the cards
        const player1Game: Card[] = [];
        const player2Game: Card[] = [];

        // Go through all the cards in the deck
        deck.getCards().forEach((card, index) => {
            // If the index is even, add the card to player1 if not add it to player2
            if (index % 2 === 0) {
                player1Game.push(card);
            } else {
                player2Game.push(card);
            }
        });
        // Return the two arrays
        return { player1Game, player2Game };
    }

    public run(): void {
        // Display the players and the number of cards they have (it should be 26)
        console.log(`Starting game between ${this.player1.getName()} and ${this.player2.getName()}!\n`);

        // while players have cards and the round is less than the max round, you keep playing
        while (this.player1.hasCards() && this.player2.hasCards() && this.round < this.maxRound) {
            this.round++;
            console.log(`--- Round ${this.round} ---`);
            this.playRound();
            console.log(`${this.player1.getName()} has ${this.player1.cardCount()} cards.`);
            console.log(`${this.player2.getName()} has ${this.player2.cardCount()} cards.\n`);
        }
        // when the maxRound is reached or one player does not have cards anymore, declare the winner
        this.declareWinner();
    }

    private playRound(): void {
        // increment the round count
        this.round++;
        // Reset the field for each round
        this.field = [];

        const card1 = this.player1.drawCard();
        const card2 = this.player2.drawCard();

        // If both players can play, display the cards and compare them
        if (card1 && card2) {
            this.field.push(card1, card2);
            console.log(`${this.player1.getName()} plays: ${card1.display()}`);
            console.log(`${this.player2.getName()} plays: ${card2.display()}`);

            // Compare the cards and add them to the winner's hand
            if (card1.getValue() > card2.getValue()) {
                console.log(`${this.player1.getName()} wins the round.\n`);
                this.player1.addCards(this.field);
            } else if (card1.getValue() < card2.getValue()) {
                console.log(`${this.player2.getName()} wins the round.\n`);
                this.player2.addCards(this.field);
            // If there's a tie (equality), initiate a war
            } else {
                console.log(`It's a tie! Initiating a war... Good luck !\n`);
                this.initiateWar();
            }
        }
    }

    private initiateWar(): void {
        // Increment the war count
        this.warCount++;
        // Each player places three cards face-down
        for (let i = 0; i < 3; i++) {
            const faceDown1 = this.player1.drawCard();
            const faceDown2 = this.player2.drawCard();
            if (faceDown1) this.field.push(faceDown1);
            if (faceDown2) this.field.push(faceDown2);
        }
    
        // Each player draws one card face-up
        const faceUp1 = this.player1.drawCard();
        const faceUp2 = this.player2.drawCard();
    
        // Check if both players have drawn a face-up card
        if (faceUp1 && faceUp2) {
            // Add the face-up cards to the field
            this.field.push(faceUp1, faceUp2);
    
            // Display the cards of both players
            console.log(`${this.player1.getName()} places 3 cards face-down and draws: ${faceUp1.display()}`);
            console.log(`${this.player2.getName()} places 3 cards face-down and draws: ${faceUp2.display()}`);
    
            // Compare the face-up cards to determine the winner of the war
            if (faceUp1.getValue() > faceUp2.getValue()) {
                console.log(`${this.player1.getName()} wins the war.\n`);
                this.player1.addCards(this.field);
                this.field = []; 
            } else if (faceUp1.getValue() < faceUp2.getValue()) {
                console.log(`${this.player2.getName()} wins the war.\n`);
                this.player2.addCards(this.field);
                this.field = []; 
            } else {
                // If there's a tie, initiate another war recursively
                console.log(`Oh, there's another tie. War continues...\n`);
                this.initiateWar();
            }
        } else {
            // Handle scenarios where players can't continue the game
            if (!faceUp1 && !faceUp2) {
                console.log(`Both players can't continue the war.`);
            } else if (!faceUp1) {
                console.log(`${this.player1.getName()} can't continue the war! ${this.player2.getName()} wins the war.\n`);
                this.player2.addCards(this.field);
            } else if (!faceUp2) {
                console.log(`${this.player2.getName()} can't continue the war! ${this.player1.getName()} wins the war.\n`);
                this.player1.addCards(this.field);
            }
            // Reset the field after the war concludes
            this.field = []; 
        }
    }    

    private declareWinner(): void {
        // Display the winner of the game
        console.log(`--- Game Over after ${this.round} rounds ---`);

        // If both players have cards
        if ((this.player1.hasCards() && !this.player2.hasCards()) || (this.player2.hasCards() && !this.player1.hasCards())) {
            console.log(`The game ends because one of the players doesn't have cards anymore.`);
            // determine which player has cards and declare them the winner
            if (this.player1.hasCards()) {
                console.log(`You made ${this.warCount} wars and ${this.player1.getName()} wins the game!`);
            } else {
                console.log(`You made ${this.warCount} wars and ${this.player2.getName()} wins the game!`);
            }
        } else {
            console.log(`The game ends because you've reached the maximum rounds and you're tired to play...\nYou made ${this.warCount} wars.\nTake a coffee and try again !`);
        }
    }
}