import { Player } from "../script/player.js";


describe("Player", () => {
    test("Player has his own gameboard", () => {
        let player = new Player();
        
        expect(player.gameBoard).toBeDefined();
    })
})