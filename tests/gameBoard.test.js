import { GameBoard } from "../script/gameBoard.js";

describe("Gameboard", () => {
    test("Ships are properly placed at the given coordinates", () => {
        const gameBoard = new GameBoard();

        gameBoard.placeShip(3, 4, 4);

        expect(gameBoard.board[3][4]).not.toBe(null);
        expect(gameBoard.board[3][5]).not.toBe(null);
        expect(gameBoard.board[3][6]).not.toBe(null);
        expect(gameBoard.board[3][7]).not.toBe(null);
    })

    test("Ships cannot be placed out of bounds", () => {
        const gameBoard = new GameBoard();

        expect(() => gameBoard.placeShip(0, 8, 4)).toThrow("Invalid ship placement")
    })

    test("Registers hits and misses correctly", () => {
        const board = new GameBoard();
        board.placeShip(0, 0, 2);
        
        expect(board.receiveAttack(0, 0)).toBe("hit");
        expect(board.receiveAttack(5, 5)).toBe("miss");
        expect(board.board[5][5]).toBe("miss");
    });

    test("Returns true when all ships are sunk", () => {
        const board = new GameBoard();
        board.placeShip(0, 0, 2);

        board.receiveAttack(0, 0);
        board.receiveAttack(0, 1);
        
        expect(board.allShipsSunk()).toBe(true);
    });
})