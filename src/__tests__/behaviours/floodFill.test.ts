import { ISnake, IBoard, Directions } from '../../Types';
import { findAdjacent, findWalkable, getSinglePath } from '../../behaviours/floodFill';
import { gameState } from '../fixtures/Gamestate';

describe('floodFill', () => {
  test('should cause our snake to self-destruct', () => {
    // Arrange
    const board: IBoard = gameState.board;
    const us: ISnake = gameState.board.snakes[0];
    us.body = [
      {
        x: 2,
        y: 4,
      }
    ];

    const path = [];

    var arr = [
      [1, 1, 0, 1, 0],
      [1, 1, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1]
    ];

    const beenHere = new Set<String>();

    // Act
    const walkable = findWalkable(arr);
    const region = findAdjacent(us, walkable);
    const flood = getSinglePath(us.body[0], region, beenHere);

    console.log(flood);
  });
});
