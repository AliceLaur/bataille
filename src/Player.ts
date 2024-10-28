import { Card } from "./Card";

export class Player {
    private id: number;
    public score: number;
    public cards: Card[];

  constructor(id: number, score: number, cards: Card[]) {
    this.id = id;
    this.score = score;
    this.cards = cards;
    
  }


}