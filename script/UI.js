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
        turnText.innerText = "Place your ships";

        const p2 = document.getElementById("p2");
        p2.classList.add("display-none");

        const p1 = document.getElementById("p1");
        p1.classList.remove("pe-none");

        this.renderShipPalette();
    }

    listenForAttacks(callback) {
        const cells = document.querySelectorAll("div.board .cell");

        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const x = parseInt(cell.dataset.row);
                const y = parseInt(cell.dataset.col);
                callback(x, y);
            }, { once: true });
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

    // setBoardsInert() {
    //     let boards = document.querySelectorAll("div.board");
    //     boards.forEach(board => {
    //         board.classList.add("pe-none");
    //     })
    // }

    setBoardsActive() {
        document.querySelectorAll(".grid.board").forEach(board => {
            board.classList.remove("pe-none");
        });
    }

    showRestartButton() {
        let button = document.querySelector("button.restart");
        button.classList.remove("display-none");
    }

    hideRestartButton() {
        let button = document.querySelector("button.restart");
        button.classList.add("display-none");
    }

    clickRestartButton(callback) {
        const button = document.querySelector("button.restart");
        button.onclick = () => callback();
    }

    renderShipPalette() {
        const ships = document.querySelectorAll("div.ship-yard div.ship");
        ships.forEach((ship) => {
            const length = ship.dataset.length;
            let i = 0;
            let html = ``;
            while (i < length) {
                html += `<div class="ship-cell"></div>`
                i++;
            }
            ship.innerHTML = html;
        })
    }

    previewCells(cells, type) {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(`#player1-board .cell[data-row='${row}'][data-col='${col}']`);
            if (cell) {
                cell.classList.add(type === "valid" ? "preview-valid" : "preview-invalid");
            }
        });
    }

    // highlightPreview(x, y, length, isVertical, isValid) {
    //     const cells = [];
    //     for (let i = 0; i < length; i++) {
    //         const row = isVertical ? x + i : x;
    //         const col = isVertical ? y : y + i;
    //         cells.push([row, col]);
    //     }
    //     this.previewCells(cells, isValid ? "valid" : "invalid");
    // }

    clearPreview() {
        const previewCells = document.querySelectorAll("#player1-board .preview-valid, #player1-board .preview-invalid");
        previewCells.forEach(cell => {
            cell.classList.remove("preview-valid", "preview-invalid");
        });
    }

    // markShipPlaced(x, y, length, isVertical) {
    //     for (let i = 0; i < length; i++) {
    //         const row = isVertical ? x + i : x;
    //         const col = isVertical ? y : y + i;
    //         const cell = document.querySelector(`#player1-board .cell[data-row='${row}'][data-col='${col}']`);
    //         if (cell) {
    //             cell.classList.add("ship-placed");
    //         }
    //     }
    // }

    placeShipCells(cells) {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(`#player1-board .cell[data-row='${row}'][data-col='${col}']`);
            if (cell) {
                cell.classList.add("placed");
            }
        });
    }

    showStartButton(controller) {
        const buttonDiv = document.querySelector("div.start-game");
        const shipPalette = document.querySelector("div.ship-palette");

        shipPalette.classList.add("display-none");
        buttonDiv.classList.remove("display-none");

        this.attachStartListener(() => {
            controller.startGame();
        });
    }

    attachStartListener(callback) {
        const startButton = document.querySelector("button.start-game")
        startButton.addEventListener("click", function startGame() {
            startButton.removeEventListener("click", startGame);
            callback();
        })
    }

    showGameBoard() {
        const buttonDiv = document.querySelector("div.start-game");
        buttonDiv.classList.add("display-none");

        const p2 = document.getElementById("p2");
        p2.classList.remove("display-none");

        const p1 = document.getElementById("p1");
        p1.classList.add("pe-none");
    }

    showShipPalette() {
        const buttonDiv = document.querySelector("div.start-game");
        const shipPalette = document.querySelector("div.ship-palette");

        this.resetShipPalette();

        shipPalette.classList.remove("display-none");
        buttonDiv.classList.add("display-none");
    }

    resetShipPalette() {
        const ships = document.querySelectorAll("div.ship-yard .ship");
        for (const ship of ships) {
            ship.classList.remove("placed");
        }
    }
}