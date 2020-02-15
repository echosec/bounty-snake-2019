import {
  IBoard,
  ICoordinate,
  ISnake
} from './Types';

const SAFE = 0;
const NOPE = 1;

/**
 * Takes the board state and creates a multidimensional array of 0s
 * e.g.
 * [
 *   [0,0,0],
 *   [0,0,0],
 *   [0,0,0],
 * ]
 * @param {IBoard} board - the board state
 * @returns {number[][]} - a multidimensional array
 */
function createGrid(board: IBoard): number[][] {
  let row: number[];
  const grid: number[][] = [];

  // For each square of height, create a row
  while(grid.length < board.height) {
    row = [];

    // Define each node in the row as walkable
    while(row.length < board.width) {
      row.push(SAFE);
    }

    // Add the row to the grid
    grid[grid.length] = row;
  }

  return grid;
}

/**
 * Add snakes to the grid
 */
function addSnakes(grid: number[][], snakes: ISnake[]) {
  // Make a copy of the grid
  const newGrid = [...grid];

  // For each snake, iterate over its segments,
  // marking the coordinates as unwalkable
  snakes.forEach((snake: ISnake): void => {
    snake.body.forEach((segment: ICoordinate): void => {
      newGrid[segment.y][segment.x] = NOPE;
    })
  });

  return newGrid;
}