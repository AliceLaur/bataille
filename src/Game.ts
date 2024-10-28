import { Player } from './Player';
import { Card } from './Card';
import { Deck } from './Deck';

export class Game {
    private player1: Player;
    private player2: Player;
    private turn: number;
    private max_turns: number;
    

    constructor(player1: Player, player2: Player, turn: number, max_turns: number) {
        this.player1 = new Player(1, 0, new Deck([]).firstHalf);
        this.player2 = new Player(2, 0, new Deck([]).secondHalf);
        this.turn = 0;
        this.max_turns = 200;
    }



    //private cards_played_1: Card[];
    // private cards_played_2: Card[];
    // private cards_won_1: Card[];
    // private cards_won_2: Card[];
}