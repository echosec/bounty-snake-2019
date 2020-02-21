import {
  IBoard,
  ICoordinate,
  ISnake,
  Matrix
} from './Types';
import Pathfinder from 'pathfinding';

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
 * @returns {Matrix} - a multidimensional array
 */
function createGrid(board: IBoard): number[][] {
  let row: number[];
  const grid: Matrix = [];

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
function addSnakes(grid: Matrix, snakes: ISnake[]) {
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

/**
 * Convert coordinates to a string of either
 * 'left', 'right', 'up', or 'down'
 * @param {ICoordinate} move - the coordinates to move to
 * @param {ICoordinate} start - the coordinates to start at
 * @returns {string} - an orthogonal direction
 */
function coordinatesToDirection(move: ICoordinate, start: ICoordinate): string {
  // Calculate the difference between start and finish
  const delta: ICoordinate = {
    x: start.x - move.x,
    y: start.y - move.y
  }

  // We should only ever be traversing one node at a time,
  // so if the absolute value of either delta is greater than
  // 1, something has gone horribly wrong
  if (Math.abs(delta.x) > 1 || Math.abs(delta.y) > 1) {
    return null;
  }

  if (delta.x = -1) {
    return 'left';
  }

  if (delta.x = 1) {
    return 'right';
  }

  if (delta.y = -1) {
    return 'up';
  }

  return 'down';
}

/**
 * Use the pathfinding library to find
 * a path to our target
 * @param {Matrix} grid - a matrix containing 1s and 0s
 * @param {ICoordinate} start - the starting coordinates for pathfinding
 * @param {ICoordinate} target - the end coordinates for pathfinding
 * @returns {string} - the direction to move
 */
function findPath(grid: Matrix, start: ICoordinate, target: ICoordinate) {
  // Instantiate the pathfinding grid and A* pathfinder
  const pfGrid = new Pathfinder.Grid(grid);
  const finder = new Pathfinder.AStarFinder();

  // Set our head and target as walkable, because if they
  // are part of a snake's body, they will be unwalkable by default
  pfGrid.setWalkableAt(start.x, start.y, true);
  pfGrid.setWalkableAt(target.x, target.y, true);

  // finder.findPath returns a matrix of paired coordinate values
  // eg. [ [ 1, 2 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ] ]
  const path: Matrix = finder.findPath(
    start.x,
    start.y,
    target.x,
    target.y,
    grid
  );

  // If a path is found, return it
  if (path && path.length) {
    return path;
  }

  // If not, return an empty array
  return [];
}

/**
 * Get the next move from a Pathfinder path
 * @param {Matrix} path - paired coordinates, eg. [ [ 1, 2 ], [ 1, 1 ] ]
 * @returns {ICoordinate} - the coordinates to move to
 */
function getNextMove(path: Matrix) {
  const move: ICoordinate = {
    x: path[0][0],
    y: path[0][1],
  };

  return move;
}