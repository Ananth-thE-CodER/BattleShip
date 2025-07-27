import { GameController } from "./gameController.js";
import { Player } from "./player.js";

export class UI {
    renderBoards(player1, player2) {
        const player1Grid = document.querySelector("#player1-board");
        const player2Grid = document.querySelector("#player2-board");

        player1Grid.dataset.gridPlayer = player1.id;
        player2Grid.dataset.gridPlayer = player2.id;

        player1Grid.innerHTML = "";
        player2Grid.innerHTML = "";

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const player1Cell = document.createElement("div");
                player1Cell.classList.add("cell");
                player1Cell.dataset.row = row;
                player1Cell.dataset.col = col;

                const player2Cell = document.createElement("div");
                player2Cell.classList.add("cell");
                player2Cell.dataset.row = row;
                player2Cell.dataset.col = col;

                player1Grid.appendChild(player1Cell);
                player2Grid.appendChild(player2Cell);
            }
        }
        let turnText = document.querySelector("span.turn-text")
        turnText.innerText = "Player 1's Turn";
        player1Grid.classList.add("pe-none");
    }

    listenForAttacks(callback) {
        const cells = document.querySelectorAll("div.board .cell");

        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const x = parseInt(cell.dataset.row);
                const y = parseInt(cell.dataset.col);
                callback(x, y);
            }, {once: true});
        });
    }

    updateBoard(player_id, x, y, result) {
        const board = document.querySelector(`div.board[data-grid-player='${player_id}']`);
        const cell = board.querySelector(`div.cell[data-row='${x}'][data-col='${y}']`);
        if (result === "hit") {
            cell.classList.add("hit");
        } else {
            cell.classList.add("miss");
        }
    }

    setTurnText(player) {
        let turnText = document.querySelector("span.turn-text")
        turnText.innerText = `${player.name}'s Turn`
    }

    announceWinner(player) {
        let turnText = document.querySelector("span.turn-text")
        turnText.innerText = `${player.name} Won!!`
    }

    setBoardsInert() {
        let boards = document.querySelectorAll("div.board");
        boards.forEach(board => {
            board.classList.add("pe-none");
        })
    }

    setBoardsActive() {
        let boards = document.querySelectorAll("div.board");
        if (boards.length > 1) {
            boards[1].classList.remove("pe-none");
        }
    }

    showRestartButton() {
        let button = document.querySelector("button.restart");
        button.classList.remove("display-none");
    }

    clickRestartButton() {
        let button = document.querySelector("button.restart");
        button.addEventListener("click", () => {
            const player1 = new Player("Player 1");
            const player2 = new Player("Computer", true);
            const controller = new GameController(player1, player2);
            controller.restartGame();
            this.setBoardsActive()
        })
    }

    renderShipPalette() {
        const ships = document.querySelectorAll("div.ship-palette div.ship");
        
    }

    
}