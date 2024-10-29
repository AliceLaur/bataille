import { Card } from "./Card";

export class Player {
    private name: string;
    private hand: Card[];

    constructor(name: string, hand: Card[]) {
    this.name = name;
    this.hand = hand;
    }

    public getName(): string {
        return this.name;
    }

    public getCards(): Card[] {
        return this.hand;
    }

    public hasCards(): boolean {
        return this.hand.length > 0;
    }

    public drawCard(): Card | null {
        return this.hand.shift() || null;
    }

    public addCards(cards: Card[]): void {
        this.hand.push(...cards);
    }

    public cardCount(): number {
        return this.hand.length;
    }
}