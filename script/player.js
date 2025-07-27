import { GameBoard } from "./gameBoard.js";

export class Player {
    constructor(name, isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.gameBoard = new GameBoard();
        this.id = crypto.randomUUID();
    }

    attack(player, x, y) {
        const gameBoard = player.gameBoard;
        return gameBoard.receiveAttack(x, y);
    }
}