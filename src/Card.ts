import { Suit } from "./Suit";
import { Figure } from "./Figure";

export class Card {
    private suit: Suit;
    private figure: Figure;
    private value: number;

    constructor(value: number, suit: Suit, figure: Figure) {
        this.value = value;
        this.suit = suit;
        this.figure = figure;
    }

    

    public getValue(): number {
        return this.value;
    }

    public getSuit(): Suit {
        return this.suit;
    }

    public getFigure(): Figure {
        return this.figure;
    }

    public display(): string {
        return `${this.figure} OF ${this.suit}`
    }
}