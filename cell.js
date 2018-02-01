class Cell {

    constructor(x, y, dimension, status) {
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.status = status;
    }

    draw() {
        // Black color if cell is dead, white if cell is alive
        this.isAlive() ? fill (255, 255, 255) : fill(0, 0, 0);
        rect(this.x, this.y, this.dimension, this.dimension);
    }

    isAlive() {
        if (this.status == 0)
            return false;
        else
            return true;
    }
};