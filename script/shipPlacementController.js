import { GameBoard } from "./gameBoard.js";

export class ShipPlacementController {
    constructor(player, ui, onAllShipsPlaced) {
        this.player = player;
        this.ui = ui;
        this.onAllShipsPlaced = onAllShipsPlaced;

        this.selectedShipLength = null;
        this.selectedShipElement = null;
        this.orientation = "horizontal";
        this.placedShips = [];
        this.availableShips = [4, 3, 3, 4, 2, 1, 1, 1]; // typical battleship setup

        this.player.gameBoard.resetBoard();

        console.log(this.player.id);
    }

    setupListeners() {
        this.boundPreview = (e) => this.previewPlacement(e);
        this.boundClearPreview = () => this.ui.clearPreview();
        this.boundTryPlace = (e) => this.tryPlaceShip(e);
        this.boundToggle = () => {
            this.orientation = this.orientation === "horizontal" ? "vertical" : "horizontal";
            toggleBtn.innerText = `Rotate: ${this.orientation.charAt(0).toUpperCase() + this.orientation.slice(1)}`;
        };

        // Ship selection
        document.querySelectorAll(".ship-yard .ship").forEach(ship => {
            ship.addEventListener("click", () => this.selectShip(ship));
        });

        // Toggle orientation
        const toggleBtn = document.getElementById("orientation-toggle");
        toggleBtn.addEventListener("click", this.boundToggle);

        // Board hover + click
        const playerGrid = document.querySelector("#player1-board");
        playerGrid.addEventListener("mouseover", this.boundPreview);
        playerGrid.addEventListener("mouseout", this.boundClearPreview);
        playerGrid.addEventListener("click", this.boundTryPlace);
    }

    selectShip(shipElement) {
        if (shipElement.classList.contains("placed")) return;
        this.selectedShipLength = parseInt(shipElement.dataset.length);
        this.selectedShipElement = shipElement;
    }

    previewPlacement(e) {
        if (!this.selectedShipLength || !e.target.classList.contains("cell")) return;

        const x = parseInt(e.target.dataset.row);
        const y = parseInt(e.target.dataset.col);
        const isVertical = this.orientation === "vertical";
        const coords = [];

        for (let i = 0; i < this.selectedShipLength; i++) {
            const row = isVertical ? x + i : x;
            const col = isVertical ? y : y + i;
            coords.push([row, col]);
        }

        const valid = this.canPlaceShip(coords);
        this.ui.previewCells(coords, valid ? "valid" : "invalid");
    }

    tryPlaceShip(e) {
        if (!this.selectedShipLength || !e.target.classList.contains("cell")) return;

        const x = parseInt(e.target.dataset.row);
        const y = parseInt(e.target.dataset.col);
        const isVertical = this.orientation === "vertical";
        const coords = [];

        for (let i = 0; i < this.selectedShipLength; i++) {
            const row = isVertical ? x + i : x;
            const col = isVertical ? y : y + i;
            coords.push([row, col]);
        }

        if (!this.canPlaceShip(coords)) return;

        // Place ship logically
        this.player.gameBoard.placeShip(x, y, this.selectedShipLength, isVertical);

        // Mark in UI
        this.ui.placeShipCells(coords);
        this.selectedShipElement.classList.add("placed");

        this.placedShips.push(this.selectedShipLength);
        this.selectedShipLength = null;
        this.selectedShipElement = null;
        this.ui.clearPreview();

        if (this.placedShips.length === this.availableShips.length) {
            this.onAllShipsPlaced(); // Callback to start the game
        }
    }

    canPlaceShip(coords) {
        return coords.every(([row, col]) => {
            return (
                row >= 0 &&
                row < 10 &&
                col >= 0 &&
                col < 10 &&
                !this.player.gameBoard.board[row][col]
            );
        });
    }

    teardown() {
        // Remove all event listeners
        document.querySelectorAll(".ship-yard .ship").forEach(ship => {
            ship.replaceWith(ship.cloneNode(true));
        });

        const playerGrid = document.querySelector("#player1-board");
        if (playerGrid) {
            playerGrid.removeEventListener("mouseover", this.boundPreview);
            playerGrid.removeEventListener("mouseout", this.boundClearPreview);
            playerGrid.removeEventListener("click", this.boundTryPlace);
        }

        const toggleBtn = document.getElementById("orientation-toggle");
        if (toggleBtn) {
            toggleBtn.removeEventListener("click", this.boundToggle);
        }
    }
}