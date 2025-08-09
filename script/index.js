import "../styles/style.css"

import { GameController } from "./gameController.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";
import { ShipPlacementController } from "./shipPlacementController.js";

let currentShipPlacer = null;

function startNewGame() {
    const ui = new UI();
    const player1 = new Player("Player 1");
    const player2 = new Player("Computer", true);

    ui.renderBoards(player1, player2);
    ui.showShipPalette();

    // Clean up previous ship placer
    if (currentShipPlacer) {
        currentShipPlacer.teardown();
    }

    const shipPlacer = new ShipPlacementController(player1, ui, () => {
        const controller = new GameController(player1, player2);
        ui.showStartButton(controller);
        ui.clickRestartButton(startNewGame);
    });

    shipPlacer.setupListeners();
    currentShipPlacer = shipPlacer;

    ui.setBoardsActive();
    ui.hideRestartButton();
}

// First load
startNewGame();
