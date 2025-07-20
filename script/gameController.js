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
        ui.listenForAttacks((x, y) => {
            const attacker = this.activePlayer;
            const defender = this.inActivePlayer;
            const result = attacker.attack(defender, x, y);

            if (result != 'hit') {
                this.switchActivePlayer();
                this.boardSwitcher();
            }

            ui.updateBoard(defender.id, x, y, result);
            
            // Later: computer attacks back
        });
    }

    switchActivePlayer() {
        this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
        this.inActivePlayer = this.players.filter(player => player.id != this.activePlayer.id)[0];
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
}