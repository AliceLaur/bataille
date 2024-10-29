import { Player } from './Player';
import { Card } from './Card';
import { Deck } from './Deck';

export class Game {
    private player1: Player;
    private player2: Player;
    private round: number;
    private maxRound: number;
    
    
    constructor(player1Name: string, player2Name: string, maxRound: number = 200) {
        const deck = new Deck();
        deck.shuffleDeck();
        const { player1Game, player2Game } = deck.deal();
        this.player1 = new Player(player1Name, player1Game);
        this.player2 = new Player(player2Name, player2Game);
        this.round = 0;
        this.maxRound = maxRound;
    }


    public run(): void {
        // Display the players and the number of cards they have (it should be 26)
        console.log(`Starting game between ${this.player1.getName()} and ${this.player2.getName()}!\n`);
        // while both players have cards and the round is less than the max round, you keep playing
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

        const cardsInPlay: Card[] = [];
        const card1 = this.player1.drawCard();
        const card2 = this.player2.drawCard();

        // If both players can play, display the cards and compare them
        if (card1 && card2) {
            cardsInPlay.push(card1, card2);
            console.log(`${this.player1.getName()} plays: ${card1.display()}`);
            console.log(`${this.player2.getName()} plays: ${card2.display()}`);

            // Compare the cards and add them to the winner's hand
            if (card1.getValue() > card2.getValue()) {
                console.log(`${this.player1.getName()} wins the round.\n`);
                this.player1.addCards(cardsInPlay);
            } else if (card1.getValue() < card2.getValue()) {
                console.log(`${this.player2.getName()} wins the round.\n`);
                this.player2.addCards(cardsInPlay);
            // If the cards are equal, initiate a war 
            } else {
                console.log(`The game is tied ! Initiating war...\n`);
                this.initiateWar(cardsInPlay);
            }
        }
    }

    private initiateWar(cardsInPlay: Card[]): void {
        // Create arrays to store the cards in play
        const warCards1: Card[] = [];
        const warCards2: Card[] = [];

        // Each player places three cards face-down
        for (let i = 0; i < 3; i++) {
            const faceDown1 = this.player1.drawCard();
            const faceDown2 = this.player2.drawCard();
            if (faceDown1) warCards1.push(faceDown1);
            if (faceDown2) warCards2.push(faceDown2);
        }

        // Each player draws one card face-up
        const faceUp1 = this.player1.drawCard();
        const faceUp2 = this.player2.drawCard();

        // If both players can continue the war then compare the face-up cards
        if (faceUp1 && faceUp2) {
            cardsInPlay.push(...warCards1, faceUp1, ...warCards2, faceUp2);
            console.log(`${this.player1.getName()} places 3 cards face-down and draws: ${faceUp1.display()}`);
            console.log(`${this.player2.getName()} places 3 cards face-down and draws: ${faceUp2.display()}`);

            if (faceUp1.getValue() > faceUp2.getValue()) {
                // If player 1 wins the war
                console.log(`${this.player1.getName()} wins the war.\n`);
                this.player1.addCards(cardsInPlay);
            } else if (faceUp1.getValue() < faceUp2.getValue()) {
                // If player 2 wins the war
                console.log(`${this.player2.getName()} wins the war.\n`);
                this.player2.addCards(cardsInPlay);
            } else {
                // If there's another equality
                console.log(`Oh, there's another tie. War continues... \n`);
                this.initiateWar(cardsInPlay);
            }
        } else {
            // If both players can't continue the war
            if (!faceUp1 && !faceUp2) {
                console.log(`Both players can't continue the war`);
            } else if (!faceUp1) {
                // If player 1 can't continue the war
                console.log(`${this.player1.getName()} can't continue the war! ${this.player2.getName()} wins the war.\n`);
                this.player2.addCards(cardsInPlay);
            } else if (!faceUp2) {
                // If player 2 can't continue the war
                console.log(`${this.player2.getName()} can't continue the war! ${this.player1.getName()} wins the war.\n`);
                this.player1.addCards(cardsInPlay);
            }
        }
    }

    private declareWinner(): void {
        // Display the winner of the game
        console.log(`--- Game Over after ${this.round} rounds ---`);
        // If player 1 has cards and player 2 doesn't
        if (this.player1.hasCards() && !this.player2.hasCards()) {
            console.log(`${this.player1.getName()} wins the game!`);
        // If player 2 has cards and player 1 doesn't
        } else if (this.player2.hasCards() && !this.player1.hasCards()) {
            console.log(`${this.player2.getName()} wins the game!`);
        // If both players have cards but you've reached the maximum rounds
        } else {
            console.log(`The game ends because you've reached the maximum rounds and you're tired to play... Take a coffee and try again !`);
        }
    }
}