import { Ship } from "../script/ship.js";

describe("Testing Ship", () => {
    let marshall;

    beforeEach(() => {
        marshall = new Ship(3);
    })

    test('Hit Ship and isSunk', () => {
        
        marshall.hit();
        marshall.hit();
        marshall.hit();

        expect(marshall.isSunk()).toBe(true);
    });
})