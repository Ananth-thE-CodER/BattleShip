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
    }

    listenForAttacks(callback) {
        const cells = document.querySelectorAll("div.board .cell");

        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                debugger;
                const x = parseInt(cell.dataset.row);
                const y = parseInt(cell.dataset.col);
                callback(x, y);
            });
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
}