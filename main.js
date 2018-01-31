/**
 * TODO:
 *     - calculate cells on edges
 */

const CANVAS_WIDTH   = 1000;
const CANVAS_HEIGHT  = 600;
const CELL_DIMENSION = 10;

let grid; // Cell[][] grid

/* Creates grid with random cells. */
function createGrid() {
    let numRows = CANVAS_HEIGHT / CELL_DIMENSION;
    let numCols = CANVAS_WIDTH  / CELL_DIMENSION;
    grid = new Array(numCols);

    let counter = 0;

    for (let i = 0; i < grid.length; ++i) {
        grid[i] = new Array(numRows);

        // Creates Cell objects, randomized dead or alive
        for (let j = 0; j < grid[i].length; ++j) {
            let status = floor(random(2)); // dead or alive

            // This is just to make less cells so that game of life is nicer to watch :)
            if (counter % 5 == 0) status = 0;
            else status = 1;
            
            grid[i][j] = new Cell(i * CELL_DIMENSION, j * CELL_DIMENSION, CELL_DIMENSION - 1, status);
            counter++;    
        }
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
    for (let i = 1; i < grid.length - 1; ++i) { // NOTE!!!: For now skip edges
        for (let j = 1; j < grid[i].length - 1; ++j) {
            let aliveNeighbours = countAliveNeighbours(i, j);

            // Game logic
            if (grid[i][j].status == 1 && (aliveNeighbours < 2 || aliveNeighbours > 3)) { // Rules #1 and #3
                grid[i][j].status = 0;
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
            if (x == i && y == j) 
                continue;
            
            numOfAlive += grid[i + x][j + y].status;
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