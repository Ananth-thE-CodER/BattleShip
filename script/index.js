import "../styles/style.css"

import { GameController } from "./gameController.js";
import { Player } from "./player.js";

const player1 = new Player();
const player2 = new Player();


const controller = new GameController(player1, player2);

controller.startGame();