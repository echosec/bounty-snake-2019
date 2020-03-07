import { ISnake, IBoard, Directions } from '../../Types';
import { findWalkable } from '../../behaviours/floodFill';
import { gameState } from '../fixtures/Gamestate';

describe('floodFill', () => {
    test('should cause our snake to self-destruct', () => {
        // Arrange
        const board: IBoard = gameState.board;
        const us: ISnake = gameState.board.snakes[0];

        var arr = [
            [1, 1, 0, 1, 0],
            [1, 1, 0, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1]
        ];

        // Act
        const flood = findWalkable(arr);

        console.log(flood);
    });
});
