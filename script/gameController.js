import { Player } from "./player.js"
import { UI } from "./UI.js";

export class GameController {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.activePlayer = player1;
        this.inActivePlayer = this.players.filter(player => player.id != this.activePlayer.id)[0];
    }

    startGame() {
        const player1 = this.players[0];
        const player2 = this.players[1];
        
        // Place a ship manually
        player1.gameBoard.placeShip(0, 0, 3);
        player2.gameBoard.placeShip(2, 2, 2);

        const ui = new UI();

        ui.renderBoards(player1, player2);

        if (!this.activePlayer.isComputer) {
            ui.listenForAttacks((x, y) => {
                this.handlePlayerMove(x, y, ui);
            });
        }
        else {
            this.computerPlay(this.activePlayer, this.inActivePlayer, ui);
        }
    }

    switchActivePlayer(ui) {
        this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
        this.inActivePlayer = this.players.filter(player => player.id != this.activePlayer.id)[0];
        ui.setTurnText(this.activePlayer)
    }

    handlePlayerMove(x, y, ui) {
        const attacker = this.activePlayer;
        const defender = this.inActivePlayer;

        const result = attacker.attack(defender, x, y);
        ui.updateBoard(defender.id, x, y, result);

        if (result !== "hit") {
            this.switchActivePlayer(ui);
            this.boardSwitcher();
        }
        else {
            if (this.checkWinner(attacker, defender, ui)) return;
        }

        // If computer is next, let it play
        if (this.activePlayer.isComputer) {
            this.computerPlay(this.activePlayer, this.inActivePlayer, ui);
        }
    }

    computerPlay(attacker, defender, ui) {
        setTimeout(() => {
            let x, y, result;
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            result = attacker.attack(defender, x, y);

            ui.updateBoard(defender.id, x, y, result);

            if (result != 'hit') {   // Miss
                this.switchActivePlayer(ui);
                this.boardSwitcher();
            }
            else {  // Hit
                if (this.checkWinner(attacker, defender, ui)) return;
                this.computerPlay(attacker, defender, ui);
            }
        }, 500); 
    }

    boardSwitcher() {
        const inActiveGrid = document.querySelector(`div.board[data-grid-player='${this.activePlayer.id}']`);
        const activeGrid = document.querySelector(`div.board[data-grid-player='${this.inActivePlayer.id}']`);

        this.setGridActive(activeGrid);
        this.setGridInActive(inActiveGrid);
    }

    setGridInActive(grid) {
        grid.classList.add("pe-none");
    }

    setGridActive(grid) {
        grid.classList.remove("pe-none");
    }

    closeGame(ui) {
        ui.setBoardsInert();
        ui.showRestartButton();
        return;
    }

    restartGame() {
        this.startGame();
    }

    checkWinner(attacker, defender, ui) {
        if (defender.gameBoard.allShipsSunk()) {
            ui.announceWinner(attacker);
            this.closeGame(ui);
            return true;
        }
        return false;
    }
}