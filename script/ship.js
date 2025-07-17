export class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
    }

    hit() {
        this.hitCount++;
    }

    isSunk() {
        if (this.hitCount === this.length) {
            return true;
        }
        else {
            return false;
        }
    }
}
