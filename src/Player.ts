import { Card } from "./Card";
import { Deck } from "./Deck";

export class Player {
    private id: number;
    private score: number;
    private cards: Card[];

    constructor(id: number, score: number, cards: Card[]) {
    this.id = id;
    this.score = score;
    this.cards = cards;
    }



    public getId(): number {
        return this.id;
    }

    public getScore(): number {
        return this.score;
    }

    public getCards(): Card[] {
        return this.cards;
    }
}