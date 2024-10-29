// src/index.ts
import { Deck } from "./Deck";
import { Game } from "./Game";
import { Player } from "./Player";

const player1 = new Player("Francis", []);
const player2 = new Player("Jeannette", []);
const game = new Game("Francis", "Jeannette", 50);
game.run();

