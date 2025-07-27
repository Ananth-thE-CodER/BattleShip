import "../styles/style.css"

import { GameController } from "./gameController.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";

const player1 = new Player("Player 1");
const player2 = new Player("Computer", true);


const controller = new GameController(player1, player2);

controller.startGame();

const ui = new UI();
ui.clickRestartButton();