const CANVAS_WIDTH   = 1000;
const CANVAS_HEIGHT  = 600;
const CELL_DIMENSION = 20;
let numRows = CANVAS_HEIGHT / CELL_DIMENSION;
let numCols = CANVAS_WIDTH  / CELL_DIMENSION;

let grid; // Cell[][] grid

/* Creates grid with random cells. */
function createGrid() {
    grid = new Array(numCols);

    for (let i = 0; i < grid.length; ++i) {
        grid[i] = new Array(numRows);

        // Creates Cell objects, randomized dead or alive
        for (let j = 0; j < grid[i].length; ++j) {
            let status = floor(random(2)); // dead or alive
                
            grid[i][j] = new Cell(i * CELL_DIMENSION, j * CELL_DIMENSION, CELL_DIMENSION - 1, status);
        }
    }
}

/* Option to add new cells with click or dragging mouse over screen.
 * I needed to add try-catch so there won't be any exceptions if mouseX or mouseY is out of range. */
function mouseDragged() { 
    try {
        let row = Math.floor(mouseX / CELL_DIMENSION);
        let col = Math.floor(mouseY / CELL_DIMENSION);

        if (!grid[row][col].isAlive())
            grid[row][col].status = 1;
    } catch (error) {
        return;
    }
}

/* Draw all cells to canvas. */
function drawGrid() {
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            grid[i][j].draw();
        }
    }
}

/* Game of Life logic */
function gameOfLife() {
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            let aliveNeighbours = countAliveNeighbours(i, j);

            // Game logic
            if (grid[i][j].status == 1 && (aliveNeighbours < 2 || aliveNeighbours > 3)) { // Rules #1 and #3
                grid[i][j].status = 0;
            } else if (grid[i][j].status == 1 && (aliveNeighbours == 2 || aliveNeighbours == 3)) { // Rule #2
                grid[i][j].status = 1;
            } else if (grid[i][j].status == 0 && aliveNeighbours == 3) { // Rule #4
                grid[i][j].status = 1;
            } 
        }
    }
}

/* Counts alive neighbours of Cell that is positioned at (i, j) */
function countAliveNeighbours(i, j) {
    let numOfAlive = 0;

    for (let x = -1; x < 2; ++x) {
        for (let y = -1; y < 2; ++y) {
            if (x == i && y == j) // Don't count cell (i, j) 
                continue;
            
            // Wrap-around grid. If theres nothing to the left then take last element in that row/col ... 
            let row = (i + x + numRows) % numRows;
            let col = (j + y + numCols) % numCols;
            numOfAlive += grid[col][row].status;
        }
    }    

    return numOfAlive;
} 

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    createGrid();
    frameRate(25);
}

function draw() {
    drawGrid();
    gameOfLife();
}