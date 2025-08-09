import { Ship } from "./ship.js";

export class GameBoard {
    constructor() {
        this.ships = [];
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    }

    placeShip(x, y, length, isVertical = false) {
        const ship = new Ship(length);
        const positions = [];

        for (let i = 0; i < length; i++) {
            const row = isVertical ? x + i : x;
            const col = isVertical ? y : y + i;

            // prevent going out of bounds
            if (row >= 10 || col >= 10 || this.board[row][col]) {
                throw new Error("Invalid ship placement");
            }

            positions.push([row, col]);
        }

        positions.forEach(([row, col]) => {
            this.board[row][col] = ship;
        });

        this.ships.push({ ship, positions });
    }

    receiveAttack(x, y) {
        const cell = this.board[x][y];
        if (cell && typeof cell.hit === "function") {
            cell.hit();
            return "hit";
        } else {
            this.board[x][y] = "miss";
            return "miss";
        }
    }

    allShipsSunk() {
        return this.ships.every(({ ship }) => ship.isSunk());
    }

    resetBoard() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
    }

}